'use client';

import { useEffect } from 'react';
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
