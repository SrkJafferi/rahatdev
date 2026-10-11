// Scroll QA harness: drives the local site in headless Chrome over CDP (no extra
// dependencies — Node's built-in WebSocket), captures screenshots at pinned scroll
// positions and records the DOM state plus console errors for each frame.
//
//   node scripts/qa-scroll.mjs [url] [outDir]
//
// Frames land in <outDir>/*.png, a machine-readable log in <outDir>/state.json and a
// 2x2 contact sheet per four frames in public/qa/sheet-*.html for visual review.

import { spawn } from 'node:child_process';
import { copyFile, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';

const SITE = process.argv[2] ?? 'http://127.0.0.1:4311/';
const OUT = path.resolve(process.argv[3] ?? 'outputs/qa-scroll');
const SHEETS = path.resolve('public/qa');
const CHROME = process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = Number(process.env.QA_PORT ?? 9333);
const VIEW = (() => {
  const match = (process.env.QA_VIEW ?? '').match(/^(\d+)x(\d+)$/);
  return match ? { width: Number(match[1]), height: Number(match[2]) } : { width: 1440, height: 900 };
})();
// Keep the throwaway Chrome profile outside the workspace so linters and the build
// never walk it.
const PROFILE = path.join(tmpdir(), 'rahat-qa-chrome-profile');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const chrome = spawn(
  CHROME,
  [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--mute-audio',
    '--no-first-run',
    '--no-default-browser-check',
    '--force-device-scale-factor=1',
    `--window-size=${VIEW.width},${VIEW.height}`,
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${PROFILE}`,
    'about:blank',
  ],
  { stdio: 'ignore' },
);

let ws;
for (let attempt = 0; attempt < 60 && !ws; attempt += 1) {
  try {
    const list = await fetch(`http://127.0.0.1:${PORT}/json/list`).then((res) => res.json());
    const page = list.find((target) => target.type === 'page');
    if (page?.webSocketDebuggerUrl) ws = new WebSocket(page.webSocketDebuggerUrl);
  } catch {
    // DevTools endpoint not up yet.
  }
  if (!ws) await sleep(250);
}
if (!ws) {
  chrome.kill();
  throw new Error('Chrome DevTools endpoint never became available.');
}

const pending = new Map();
const consoleLog = [];
let messageId = 0;

ws.addEventListener('message', (event) => {
  const message = JSON.parse(event.data);
  if (message.id && pending.has(message.id)) {
    pending.get(message.id)(message);
    pending.delete(message.id);
    return;
  }
  if (message.method === 'Runtime.consoleAPICalled' && ['error', 'warning'].includes(message.params.type)) {
    consoleLog.push({ kind: message.params.type, text: message.params.args.map((arg) => arg.value ?? arg.description ?? '').join(' ') });
  }
  if (message.method === 'Runtime.exceptionThrown') {
    consoleLog.push({ kind: 'exception', text: message.params.exceptionDetails?.exception?.description ?? 'unknown' });
  }
  if (message.method === 'Log.entryAdded' && message.params.entry.level === 'error') {
    consoleLog.push({ kind: 'log', text: message.params.entry.text });
  }
});

const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const id = (messageId += 1);
    pending.set(id, (message) => (message.error ? reject(new Error(`${method}: ${message.error.message}`)) : resolve(message.result)));
    ws.send(JSON.stringify({ id, method, params }));
  });

await new Promise((resolve) => ws.addEventListener('open', resolve, { once: true }));
await send('Page.enable');
await send('Runtime.enable');
await send('Log.enable');
await send('Network.enable');
await send('Emulation.setDeviceMetricsOverride', { ...VIEW, deviceScaleFactor: 1, mobile: false });
if (process.env.QA_REDUCED === '1') {
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
}

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });
await mkdir(SHEETS, { recursive: true });

await send('Page.navigate', { url: SITE });
await sleep(3200);

const evaluate = async (expression) => {
  const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  return result.result?.value;
};

const probe = `(() => {
  const rect = (el) => (el ? { top: Math.round(el.getBoundingClientRect().top), bottom: Math.round(el.getBoundingClientRect().bottom) } : null);
  const scaleOf = (el) => {
    if (!el) return null;
    const matrix = getComputedStyle(el).transform;
    if (!matrix || matrix === 'none') return 1;
    const parts = matrix.match(/matrix\\(([^)]+)\\)/);
    return parts ? Number(parts[1].split(',')[0]).toFixed(3) : matrix;
  };
  const cards = Array.from(document.querySelectorAll('.service-card'));
  const panels = Array.from(document.querySelectorAll('.project-panel'));
  const shift = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const matrix = getComputedStyle(el).transform;
    if (!matrix || matrix === 'none') return { x: 0, y: 0 };
    const parts = matrix.match(/matrix\\(([^)]+)\\)/);
    if (!parts) return matrix;
    const values = parts[1].split(',');
    return { x: Math.round(Number(values[4])), y: Math.round(Number(values[5])) };
  };
  return {
    y: Math.round(window.scrollY),
    viewport: [window.innerWidth, window.innerHeight],
    overflowX: document.documentElement.scrollWidth - window.innerWidth,
    heroArt: {
      building: shift('.hero-building'),
      cloudLeft: shift('.hero-cloud-left'),
      cloudRight: shift('.hero-cloud-right'),
    },
    cards: cards.map((card) => ({ ...rect(card), mediaScale: scaleOf(card.querySelector('.service-card-media img')) })),
    panels: panels.map((panel) => ({
      ...rect(panel),
      mediaScale: scaleOf(panel.querySelector('.project-panel-media-inner')),
      infoOpacity: panel.querySelector('.project-panel-inner') ? getComputedStyle(panel.querySelector('.project-panel-inner')).opacity : null,
    })),
    hero: rect(document.querySelector('.hero')),
  };
})()`;

const frames = [];
async function capture(name, note) {
  const state = await evaluate(probe);
  const shot = await send('Page.captureScreenshot', { format: 'png' });
  await writeFile(path.join(OUT, `${name}.png`), Buffer.from(shot.data, 'base64'));
  frames.push({ name, note, ...state });
  console.log(`${name.padEnd(22)} y=${String(state?.y).padStart(6)} heroArt=${JSON.stringify(state?.heroArt)} cards=${JSON.stringify(state?.cards?.map((c) => [c.top, c.mediaScale]))} panels=${JSON.stringify(state?.panels?.map((p) => [p.top, p.mediaScale, p.infoOpacity]))}`);
}

const to = async (y) => {
  await evaluate(`window.scrollTo({ top: ${Math.round(y)}, behavior: 'instant' }); true`);
  await sleep(650);
};

const offsets = await evaluate(`(() => {
  const top = (sel) => Math.round(document.querySelector(sel).offsetTop);
  const stack = document.querySelector('.projects-stack');
  const abs = (el) => Math.round(el.getBoundingClientRect().top + window.scrollY);
  return {
    services: top('#services'),
    stage: top('.services-stack'),
    rows: Array.from(document.querySelectorAll('.service-card')).map(abs),
    projects: top('#projects'),
    stack: Math.round(stack.getBoundingClientRect().top + window.scrollY),
    stackHeight: Math.round(stack.getBoundingClientRect().height),
    cta: top('#contact'),
    doc: document.documentElement.scrollHeight,
    vh: window.innerHeight,
  };
})()`);
console.log('offsets', JSON.stringify(offsets));

const vh = offsets.vh;
await capture('01-hero', 'hero at rest');
await to(420);
await capture('01b-hero-mid', 'hero mid-scroll: tower risen, clouds drifted');
await to(offsets.services);
await capture('02-services-head', 'what we offer marquee + Our services heading');
await to(offsets.stage - 140);
await capture('03-services-first', 'sticky stage pinned, first service active');
await to(offsets.rows[2] - vh * 0.45);
await capture('04-services-middle', 'middle service active, image swapped');
await to(offsets.rows[4] - vh * 0.5);
await capture('05-services-last', 'last service active');
await to(offsets.projects);
await capture('06-projects-head', 'selected projects marquee + heading');
await to(offsets.stack);
await capture('07-projects-p1', 'panel 1 pinned');
await to(offsets.stack + vh * 0.5);
await capture('08-projects-p1-p2', 'panel 2 sliding over panel 1');
await to(offsets.stack + vh);
await capture('09-projects-p2', 'panel 2 foreground');
await to(offsets.stack + vh * 1.5);
await capture('10-projects-p2-p3', 'panel 3 sliding over panel 2');
await to(offsets.stack + vh * 2);
await capture('11-projects-p3', 'panel 3 foreground');
await to(offsets.stack + offsets.stackHeight + vh * 0.15);
await capture('12-release', 'released into the philosophy section');
await to(offsets.stack + vh * 1.6);
await capture('13-reverse', 'scrolled backward into the previous chapter');
await to(offsets.cta);
await capture('14-cta', 'contact call to action');
await to(0);
await capture('15-hero-return', 'hero after a full round trip');

const report = { site: SITE, viewport: VIEW, frames, consoleLog, offsets };
await writeFile(path.join(OUT, 'state.json'), JSON.stringify(report, null, 2));

// 2x2 contact sheets so the frames can be reviewed through the preview panel.
const perSheet = 4;
const sheets = [];
for (let index = 0; index < frames.length; index += perSheet) {
  const group = frames.slice(index, index + perSheet);
  const cells = group
    .map((frame) => `<figure><img src="/qa/frames/${frame.name}.png"><figcaption>${frame.name} — ${frame.note} (y=${frame.y})</figcaption></figure>`)
    .join('\n');
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>QA sheet ${index / perSheet + 1}</title>
<style>body{margin:0;background:#0b0b0b;font:12px/1.4 system-ui;color:#eee}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:8px}
figure{margin:0}img{width:100%;display:block;border:1px solid #333}figcaption{padding:4px 2px;color:#9fb3c8}</style></head>
<body><div class="grid">${cells}</div></body></html>`;
  const name = `sheet-${index / perSheet + 1}.html`;
  await writeFile(path.join(SHEETS, name), html);
  sheets.push(name);
}
// The dev server only serves public/, so copy the captured frames next to the sheets.
await rm(path.join(SHEETS, 'frames'), { recursive: true, force: true });
await mkdir(path.join(SHEETS, 'frames'), { recursive: true });
for (const frame of frames) {
  await copyFile(path.join(OUT, `${frame.name}.png`), path.join(SHEETS, 'frames', `${frame.name}.png`));
}

console.log('\nconsole issues:', consoleLog.length);
for (const entry of consoleLog.slice(0, 20)) console.log(' -', entry.kind, entry.text.slice(0, 200));
console.log('sheets:', sheets.join(', '));

ws.close();
chrome.kill();
await sleep(600);
// Best-effort cleanup: Chrome releases the profile lock a moment after exit.
await rm(PROFILE, { recursive: true, force: true, maxRetries: 3 }).catch(() => {});
