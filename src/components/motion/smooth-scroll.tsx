'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import { gsap, registerMotion, ScrollTrigger } from './motion';

let scroller: Lenis | null = null;

/** Shared by chapter controls so they never compete with native smooth scrolling. */
export function scrollPageTo(target: number | HTMLElement) {
  if (scroller) {
    scroller.scrollTo(target, { duration: 1.1, lerp: 0 });
  } else if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  } else {
    target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
  }
}

export function SmoothScroll() {
  const pathname = usePathname();

  // An incoming homepage anchor is measured before its pinned sections mount.
  // Resolve it again after the route and GSAP geometry settle. Same-page anchor
  // clicks continue to use the existing Lenis behavior below.
  useEffect(() => {
    if (pathname !== '/' || !window.location.hash) return;
    const target = document.getElementById(window.location.hash.slice(1));
    if (!target) return;
    let cancelled = false;
    let frame = 0;
    const align = () => {
      if (cancelled) return;
      if (scroller) {
        scroller.resize();
        scroller.scrollTo(target, { immediate: true, force: true, offset: -88 });
      }
      else window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 88, behavior: 'instant' });
    };
    const afterRefresh = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(align); };
    const stop = () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      ScrollTrigger.removeEventListener('refresh', afterRefresh);
      for (const event of ['wheel', 'touchstart', 'keydown', 'pointerdown']) window.removeEventListener(event, stop);
    };
    // Existing sections refresh after images/fonts settle. Keep the destination
    // aligned during those refreshes, but release immediately on user input.
    ScrollTrigger.addEventListener('refresh', afterRefresh);
    for (const event of ['wheel', 'touchstart', 'keydown', 'pointerdown']) window.addEventListener(event, stop, { passive: true });
    const timer = window.setTimeout(stop, 3000);
    void document.fonts.ready.then(() => {
      if (cancelled) return;
      frame = requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        frame = requestAnimationFrame(align);
      });
    });
    return () => { stop(); window.clearTimeout(timer); };
  }, [pathname]);

  useEffect(() => {
    registerMotion();
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let cleanup: (() => void) | undefined;
    const configure = () => {
      cleanup?.();
      cleanup = undefined;
      if (preference.matches) return;
      const lenis = new Lenis({
        lerp: 0.085,
        smoothWheel: true,
        syncTouch: false,
        anchors: { offset: -88, duration: 1.1, lerp: 0 },
        prevent: (node) => document.body.style.overflow === 'hidden' ||
          !!node.closest('[role="dialog"], [role="listbox"], textarea, [data-lenis-prevent]'),
      });
      scroller = lenis;
      document.documentElement.setAttribute('data-smooth-scroll', '');
      const tick = (time: number) => lenis.raf(time * 1000);
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      cleanup = () => {
        gsap.ticker.remove(tick);
        lenis.off('scroll', ScrollTrigger.update);
        lenis.destroy();
        if (scroller === lenis) scroller = null;
        document.documentElement.removeAttribute('data-smooth-scroll');
      };
    };
    configure();
    preference.addEventListener('change', configure);
    return () => { preference.removeEventListener('change', configure); cleanup?.(); };
  }, []);
  return null;
}
