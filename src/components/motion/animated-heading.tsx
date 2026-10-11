'use client';

import { Children, cloneElement, isValidElement, useRef, type HTMLAttributes, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { DESKTOP_MOTION_QUERY, gsap, refreshAfterAssets, registerMotion } from './motion';

registerMotion();

function splitLetters(children: ReactNode): ReactNode {
  return Children.map(children, (child) => {
    if (typeof child === 'string') return child.split(/(\s+)/).map((word, index) => /^\s+$/.test(word) ? word :
      <span key={index} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>{Array.from(word).map((letter, i) =>
        <span key={i} data-heading-letter style={{ display: 'inline-block' }}>{letter}</span>)}</span>);
    if (isValidElement<{ children?: ReactNode }>(child) && child.props.children !== undefined) {
      return cloneElement(child, {}, splitLetters(child.props.children));
    }
    return child;
  });
}

function textContent(children: ReactNode): string {
  return Children.toArray(children).map(child => typeof child === 'string' ? child :
    isValidElement<{ children?: ReactNode }>(child) ? child.type === 'br' ? ' ' : textContent(child.props.children) : '').join('');
}

export function AnimatedHeading({ children, scrollControlled = false, ...props }: HTMLAttributes<HTMLHeadingElement> & { scrollControlled?: boolean }) {
  const heading = useRef<HTMLHeadingElement>(null);
  useGSAP(() => {
    const el = heading.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add({ motion: '(prefers-reduced-motion: no-preference)', pinned: `${DESKTOP_MOTION_QUERY} and (min-height: 700px)` }, (context) => {
      if (!context.conditions?.motion || (scrollControlled && context.conditions.pinned)) return;
      gsap.fromTo(el.querySelectorAll('[data-heading-letter]'), { x: 50, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.8, stagger: 0.025, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none restart reverse' },
      });
    });
    const stopRefresh = refreshAfterAssets();
    return () => { mm.revert(); stopRefresh(); };
  }, { scope: heading });
  return <h2 {...props} ref={heading} aria-label={props['aria-label'] ?? textContent(children)}>{splitLetters(children)}</h2>;
}
