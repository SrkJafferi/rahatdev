'use client';

import Image from 'next/image';
import { scrollPageTo } from '@/components/motion/smooth-scroll';
import { AnimatedHeading } from '@/components/motion/animated-heading';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { ArrowRight, ArrowUpRight, Cctv, Dumbbell, Layers3, ParkingSquare, ShieldCheck, DoorOpen } from 'lucide-react';
import { DESKTOP_MOTION_QUERY, gsap, refreshAfterAssets, registerMotion } from '@/components/motion/motion';
import { propertyFeatures } from '@/data/features';
import { projects } from '@/data/projects';
import styles from './features.module.css';

const icons = { fitness: Dumbbell, access: DoorOpen, camera: Cctv, parking: ParkingSquare, safety: ShieldCheck, finishes: Layers3 };
registerMotion();

export function Features() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const scrollRange = useRef<{ start: number; end: number } | null>(null);

  useGSAP(() => {
    const section = root.current;
    const frame = stage.current;
    const windowEl = viewport.current;
    const row = track.current;
    if (!section || !frame || !windowEl || !row) return;
    const mm = gsap.matchMedia();
    const stopRefresh = refreshAfterAssets();
    mm.add(DESKTOP_MOTION_QUERY, () => {
      const distance = () => Math.max(0, row.scrollWidth - windowEl.clientWidth);
      section.setAttribute('data-feature-motion', '');
      windowEl.scrollLeft = 0;
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: frame,
          start: 'top top',
          end: () => `+=${Math.max(distance(), window.innerHeight)}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onRefresh: (trigger) => { scrollRange.current = { start: trigger.start, end: trigger.end }; },
        },
      });
      timeline.to(row, { x: () => -distance(), ease: 'none', duration: 1 }, 0);
      timeline.fromTo(progress.current, { scaleX: 0 }, { scaleX: 1, ease: 'none', duration: 1 }, 0);
      return () => { section.removeAttribute('data-feature-motion'); scrollRange.current = null; };
    });
    return () => { mm.revert(); stopRefresh(); };
  }, { scope: root });

  return (
    <section className={styles.section} id="features" aria-labelledby="features-title" ref={root}>
      <div className={styles.stage} ref={stage}>
      <div className={styles.architecture} aria-hidden="true">
        <Image src={projects[0].image} alt="" fill sizes="(max-width: 899px) 70vw, 55vw" />
      </div>
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
          <p className={styles.eyebrow}>What we offer</p>
          <AnimatedHeading id="features-title">Amenities &amp;<br /><span className="heading-accent">Everyday Comfort</span></AnimatedHeading>
          <p className={styles.context}>Planned features at Rahat Heights, Faisal Margalla City (FMC).</p>
          </div>
          <a className={styles.explore} href={projects[0].brochure} target="_blank" rel="noopener noreferrer">Explore all features <span><ArrowRight size={21} /></span></a>
        </header>
        <div className={styles.viewport} ref={viewport} tabIndex={0} role="region" aria-label="Rahat Heights features. Scroll or use arrow keys to explore." onKeyDown={(event) => {
          const range = scrollRange.current;
          if (!range || (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft')) return;
          event.preventDefault();
          const step = (range.end - range.start) / (propertyFeatures.length - 1);
          scrollPageTo(Math.max(range.start, Math.min(range.end, window.scrollY + (event.key === 'ArrowRight' ? step : -step))));
        }}>
        <div className={styles.track} ref={track}>
          {propertyFeatures.map((feature, index) => {
            const Icon = icons[feature.icon];
            return (
              <article className={styles.feature} key={feature.title}>
                <span className={styles.iconDisc}><Icon className={styles.icon} size={48} strokeWidth={1.65} aria-hidden="true" /></span>
                <span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <h3>{feature.title}</h3>
                <p>{feature.copy}</p>
                <a className={styles.cardLink} href={projects[0].brochure} target="_blank" rel="noopener noreferrer" aria-label={`${feature.title} — view Rahat Heights brochure`}><ArrowRight size={20} /></a>
              </article>
            );
          })}
        </div>
        </div>
        <div className={styles.footer}>
        <span className={styles.address}>Rahat Heights <span>—</span> Faisal Margalla City (FMC)</span>
        <div className={styles.progress} aria-hidden="true"><span ref={progress} /></div>
        <a className={styles.source} href={projects[0].brochure} target="_blank" rel="noopener noreferrer">
          Discover Rahat Heights in the project brochure <ArrowUpRight size={15} aria-hidden="true" />
        </a>
        </div>
      </div>
      </div>
    </section>
  );
}
