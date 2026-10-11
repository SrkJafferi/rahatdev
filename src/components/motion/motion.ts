'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;

/** Registers GSAP plugins once, on the client only. */
export function registerMotion() {
  if (registered || typeof window === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export const EASE = 'power3.out';

/** Matches the CSS condition used for the pinned project showcase. */
export const DESKTOP_MOTION_QUERY = '(min-width: 900px) and (prefers-reduced-motion: no-preference)';

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Marks the document as booted so the CSS entrance guards release. */
export function markMotionReady() {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-motion-ready', '');
}

/**
 * Recalculates scroll positions once webfonts and above-the-fold images have settled,
 * so pinning distances stay accurate without layout-driven refresh loops.
 */
export function refreshAfterAssets() {
  if (typeof window === 'undefined') return () => {};
  const refresh = () => ScrollTrigger.refresh();
  const timers: number[] = [];
  document.fonts?.ready.then(refresh).catch(() => {});
  window.addEventListener('load', refresh);
  timers.push(window.setTimeout(refresh, 600));
  timers.push(window.setTimeout(refresh, 1800));
  return () => {
    window.removeEventListener('load', refresh);
    timers.forEach(clearTimeout);
  };
}

export { gsap, ScrollTrigger };
