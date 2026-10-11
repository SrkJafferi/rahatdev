import { Fragment } from 'react';

type TextMarqueeProps = {
  text: string;
  /** `dark` renders the ticker for navy sections. */
  tone?: 'light' | 'dark';
  /** Seconds for one full loop. */
  speed?: number;
  className?: string;
};

function MarqueeSet({ text, hidden = false }: { text: string; hidden?: boolean }) {
  return (
    <div className="marquee-set" aria-hidden={hidden || undefined}>
      {[0, 1].map((copy) => (
        <Fragment key={copy}>
          <span className="marquee-item">{text}</span>
          <span className="marquee-dot" aria-hidden="true">
            ·
          </span>
        </Fragment>
      ))}
    </div>
  );
}

/**
 * Oversized seamless ticker used at the entrance of the services and projects
 * sections. Decorative by design — the section heading carries the meaning — so it
 * is hidden from assistive technology and stops animating under reduced motion.
 */
export function TextMarquee({ text, tone = 'light', speed = 44, className = '' }: TextMarqueeProps) {
  return (
    <div className={`marquee ${tone === 'dark' ? 'is-dark' : ''} ${className}`} aria-hidden="true">
      <div className="marquee-track" style={{ animationDuration: `${speed}s` }}>
        <MarqueeSet text={text} />
        <MarqueeSet text={text} hidden />
      </div>
    </div>
  );
}
