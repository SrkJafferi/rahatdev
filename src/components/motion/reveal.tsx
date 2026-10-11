'use client';

import { useRef, type ElementType, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { EASE, gsap, markMotionReady, registerMotion } from './motion';

registerMotion();

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** `rise` fades and lifts, `mask` uncovers through a clip path. */
  variant?: 'rise' | 'mask';
  delay?: number;
  stagger?: number;
};

/**
 * Scroll-triggered entrance for a single element. Default CSS keeps content visible, so
 * the reveal is pure enhancement and never hides content when motion is unavailable.
 */
export function Reveal({ children, className, as: Tag = 'div', variant = 'rise', delay = 0, stagger = 0 }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      markMotionReady();
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const targets = stagger ? Array.from(el.children) : [el];
        // Both endpoints are explicit: the CSS entrance guard already holds these
        // elements at zero opacity, so a `from` tween would read that as its target.
        const from = variant === 'mask' ? { clipPath: 'inset(0% 0% 100% 0%)', scale: 1.06, opacity: 0 } : { opacity: 0, y: 34 };
        const to =
          variant === 'mask'
            ? { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, opacity: 1, y: 0 }
            : { opacity: 1, y: 0 };
        gsap.fromTo(targets, from, {
          ...to,
          duration: variant === 'mask' ? 1.15 : 0.9,
          ease: EASE,
          delay,
          stagger,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className} data-reveal={variant}>
      {children}
    </Tag>
  );
}

/**
 * Restrained scroll-linked drift for secondary imagery. Range stays inside the
 * element's own padding so no layout shift or exposed edge can occur.
 */
export function Parallax({
  children,
  className,
  as: Tag = 'div',
  strength = 8,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  strength?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          el,
          { yPercent: -strength / 2 },
          {
            yPercent: strength / 2,
            ease: 'none',
            scrollTrigger: {
              trigger: el.parentElement ?? el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
