'use client';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ZoomIn, RotateCcw } from 'lucide-react';
import { Modal } from '@/components/site/dialogs';
import type { GalleryMedia } from '@/data/gallery-media-types';
import styles from './gallery-portfolio.module.css';

function Photo({ item }: { item: GalleryMedia }) {
  const [view, setView] = useState({ scale: 1, x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);
  const start = useRef<{ x: number; y: number; left: number; top: number } | null>(null);
  return <><div className={styles.photoTools}><button aria-label="Zoom photo" onClick={() => setView({ scale: view.scale === 1 ? 2 : 1, x: 0, y: 0 })}><ZoomIn size={18} />{view.scale * 100}%</button><button aria-label="Reset photo view" onClick={() => setView({ scale: 1, x: 0, y: 0 })}><RotateCcw size={17} /></button></div><div className={styles.photoCanvas} style={{ touchAction: view.scale > 1 ? 'none' : 'pan-y', cursor: view.scale > 1 ? 'grab' : 'default' }} onPointerDown={(e) => { if (view.scale === 1) return; e.currentTarget.setPointerCapture(e.pointerId); start.current = { x: e.clientX, y: e.clientY, left: view.x, top: view.y }; }} onPointerMove={(e) => { const drag = start.current; if (!drag) return; const limitX = e.currentTarget.clientWidth / 2, limitY = e.currentTarget.clientHeight / 2; setView((v) => ({ ...v, x: Math.max(-limitX, Math.min(limitX, drag.left + e.clientX - drag.x)), y: Math.max(-limitY, Math.min(limitY, drag.top + e.clientY - drag.y)) })); }} onPointerUp={() => { start.current = null; }} onPointerCancel={() => { start.current = null; }}><div style={{ transform: `translate(${view.x}px,${view.y}px) scale(${view.scale})` }}><Image src={item.src} alt={item.title} fill sizes="95vw" quality={90} draggable={false} onLoad={() => setLoaded(true)} /></div>{!loaded && <span className={styles.imageLoading} role="status">Loading photograph…</span>}</div></>;
}
export function MediaViewer({ items, initial, close }: { items: GalleryMedia[]; initial: number; close: () => void }) {
  const [index, setIndex] = useState(initial);
  const item = items[index];
  const move = (step: number) => setIndex((n) => (n + step + items.length) % items.length);
  return <Modal open close={close} label={`${item.title}, media viewer`} className={styles.mediaModal} onArrow={move}><div className={styles.viewerHeader}><h2>{item.title}</h2><p>{item.isRender ? 'Architectural render' : item.kind === 'video' ? 'Client-supplied property walkthrough' : 'Client-supplied unit photography'}</p></div>{item.kind === 'video' ? <video key={item.id} className={styles.video} src={item.src} poster={item.poster} controls autoPlay muted playsInline preload="metadata" aria-label={item.title} /> : <Photo key={item.id} item={item} />}<div className={styles.viewerFooter}><button onClick={() => move(-1)} aria-label="Previous gallery item"><ArrowLeft size={21} /></button><span>{index + 1} / {items.length}</span><button onClick={() => move(1)} aria-label="Next gallery item"><ArrowRight size={21} /></button></div>{items.length > 1 && <div className={styles.viewerThumbs}>{items.map((m, i) => <button key={m.id} aria-label={`View ${m.title}`} aria-pressed={i === index} onClick={() => setIndex(i)}><Image src={m.poster ?? m.src} alt="" width={90} height={60} /></button>)}</div>}</Modal>;
}
