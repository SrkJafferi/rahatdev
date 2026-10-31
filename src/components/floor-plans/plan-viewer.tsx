'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Scan, Maximize2 } from 'lucide-react';
import styles from './explorer.module.css';

export function PlanViewer({ image, title, expand, large = false }: { image: string; title: string; expand?: () => void; large?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; left: number; top: number } | null>(null);
  const [view, setView] = useState({ zoom: 1, x: 0, y: 0 });
  const clamp = (zoom: number, x: number, y: number) => {
    const width = ref.current?.clientWidth ?? 600, height = ref.current?.clientHeight ?? 500;
    const limitX = (zoom - 1) * width / 2, limitY = (zoom - 1) * height / 2;
    return { zoom, x: Math.max(-limitX, Math.min(limitX, x)), y: Math.max(-limitY, Math.min(limitY, y)) };
  };
  const zoom = (delta: number) => setView((v) => clamp(Math.max(1, Math.min(6, v.zoom + delta)), v.x, v.y));
  const reset = () => setView({ zoom: 1, x: 0, y: 0 });
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const wheel = (event: WheelEvent) => {
      if (!event.ctrlKey && !event.metaKey) return;
      event.preventDefault();
      setView((v) => {
        const next = Math.max(1, Math.min(6, v.zoom - event.deltaY * .006));
        return { zoom: next, x: Math.max(-(next - 1) * element.clientWidth / 2, Math.min((next - 1) * element.clientWidth / 2, v.x)), y: Math.max(-(next - 1) * element.clientHeight / 2, Math.min((next - 1) * element.clientHeight / 2, v.y)) };
      });
    };
    element.addEventListener('wheel', wheel, { passive: false });
    return () => element.removeEventListener('wheel', wheel);
  }, []);
  return <div className={`${styles.viewer} ${large ? styles.largeViewer : ''}`}>
    <div className={styles.toolbar} role="toolbar" aria-label="Plan viewing controls"><button onClick={() => zoom(.5)} disabled={view.zoom >= 6} aria-label="Zoom in"><ZoomIn size={18} /></button><button onClick={() => zoom(-.5)} disabled={view.zoom <= 1} aria-label="Zoom out"><ZoomOut size={18} /></button><button onClick={reset} aria-label="Reset view"><RotateCcw size={17} /></button><button onClick={reset} aria-label="Fit entire plan"><Scan size={18} /></button>{expand && <button onClick={expand} aria-label="Open full-screen plan"><Maximize2 size={18} /></button>}<output aria-live="polite">{Math.round(view.zoom * 100)}%</output></div>
    <div ref={ref} tabIndex={0} role="region" aria-label={`Interactive drawing: ${title}`} aria-describedby={large ? 'large-plan-help' : 'plan-help'} className={styles.canvas} style={{ touchAction: view.zoom > 1 ? 'none' : 'pan-y', cursor: view.zoom > 1 ? 'grab' : 'default' }} onKeyDown={(e) => {
      if (['+', '=', '-', '0', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        e.preventDefault();
        if (e.key === '+' || e.key === '=') zoom(.5);
        else if (e.key === '-') zoom(-.5);
        else if (e.key === '0') reset();
        else setView((v) => clamp(v.zoom, v.x + (e.key === 'ArrowLeft' ? 40 : e.key === 'ArrowRight' ? -40 : 0), v.y + (e.key === 'ArrowUp' ? 40 : e.key === 'ArrowDown' ? -40 : 0)));
      }
    }} onPointerDown={(e) => { if (view.zoom <= 1 || e.button !== 0) return; e.currentTarget.setPointerCapture(e.pointerId); drag.current = { x: e.clientX, y: e.clientY, left: view.x, top: view.y }; }} onPointerMove={(e) => { const start = drag.current; if (start) setView((v) => clamp(v.zoom, start.left + e.clientX - start.x, start.top + e.clientY - start.y)); }} onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }}>
      <div className={styles.drawing} style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.zoom})` }}><Image src={image} alt={title} fill unoptimized sizes="100vw" draggable={false} /></div>
    </div>
    <p className={styles.viewerHelp} id={large ? 'large-plan-help' : 'plan-help'}>Ctrl / ⌘ + wheel to zoom · drag when enlarged · keyboard + / −, arrows and 0 to reset</p>
  </div>;
}
