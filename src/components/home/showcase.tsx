'use client';

import Image from 'next/image';
import { scrollPageTo } from '@/components/motion/smooth-scroll';
import { AnimatedHeading } from '@/components/motion/animated-heading';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { ArrowRight, ArrowUpRight, Building2, ChevronLeft, ChevronRight, Download, Layers3, MapPin } from 'lucide-react';
import { DESKTOP_MOTION_QUERY, gsap, markMotionReady, refreshAfterAssets, registerMotion } from '@/components/motion/motion';
import { ProjectButton } from '@/components/site/dialogs';
import { projects } from '@/data/projects';
import styles from './showcase.module.css';

registerMotion();
const pad = (value: number) => String(value).padStart(2, '0');
const chapterHeadings = [
  { lead: 'Developments that', accent: 'define our vision.' },
  { lead: 'Smarter Spaces', accent: 'for Living & Business.' },
  { lead: 'A New Chapter', accent: 'in Modern Living.' },
];

/** Foreground chapters scroll away, uncovering the stationary chapter underneath. */
export function Showcase() {
  const root = useRef<HTMLElement>(null);
  const scrollRange = useRef<{ start: number; end: number } | null>(null);
  const navigate = (index: number) => {
    const range = scrollRange.current;
    if (range) {
      scrollPageTo(range.start + (range.end - range.start) * index / (projects.length - 1));
    } else {
      const panel = root.current?.querySelectorAll<HTMLElement>('[data-project-panel]')[index];
      if (panel) scrollPageTo(panel);
    }
  };
  useGSAP(() => {
    const section = root.current;
    if (!section) return;
    markMotionReady();
    const stopRefresh = refreshAfterAssets();
    const mm = gsap.matchMedia();
    mm.add(`${DESKTOP_MOTION_QUERY} and (min-height: 700px)`, () => {
      const stage = section.querySelector<HTMLElement>('[data-project-stage]');
      const panels = gsap.utils.toArray<HTMLElement>(section.querySelectorAll('[data-project-panel]'));
      if (!stage || !panels.length) return;
      let headerOffset = 76;
      const measureHeader = () => {
        const header = document.querySelector<HTMLElement>('.site-header');
        headerOffset = header?.classList.contains('is-stuck') ? Math.ceil(header.getBoundingClientRect().height) : 76;
        section.style.setProperty('--showcase-header-offset', `${headerOffset}px`);
      };
      measureHeader();
      section.setAttribute('data-showcase-motion', '');
      // All chapters share the same image AND text geometry. Moving the complete
      // foreground panel reveals the next one from the bottom, without crossfades.
      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: stage,
          // Pin below the fixed navigation. All chapters fit the same visible
          // viewport, including when browser zoom reduces the CSS viewport.
          start: () => `top ${headerOffset}px`,
          end: () => `+=${stage.offsetHeight * (panels.length - 1)}`,
          pin: true,
          pinSpacing: true,
          scrub: true,
          invalidateOnRefresh: true,
          onRefreshInit: measureHeader,
          onRefresh: (trigger) => { scrollRange.current = { start: trigger.start, end: trigger.end }; },
        },
      });
      panels.slice(0, -1).forEach((panel, index) => {
        timeline.to(panel, { yPercent: -100, duration: 1 }, index);
        timeline.fromTo(panels[index + 1].querySelectorAll('h2 [data-heading-letter]'),
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, stagger: { amount: 0.35 }, ease: 'power3.out' }, index + 0.15);
      });
      return () => { section.removeAttribute('data-showcase-motion'); section.style.removeProperty('--showcase-header-offset'); scrollRange.current = null; };
    });
    return () => { mm.revert(); stopRefresh(); };
  }, { scope: root });

  return (
    <section id="projects" className={styles.section} ref={root} aria-labelledby="projects-title">
      <div className={styles.stage} data-project-stage>
        {projects.map((project, index) => (
          <article className={styles.panel} data-project-panel key={project.id} style={{ zIndex: projects.length - index }} aria-labelledby={`showcase-${project.id}`}>
            <div className={styles.editorial}>
                <header className={styles.intro}>
                  <div className={styles.topline}>
                    <p className={styles.eyebrow}><span />Selected projects</p>
                    <span className={styles.rule} />
                    <span className={styles.progress}>{pad(index + 1)} / {pad(projects.length)}</span>
                    <div className={styles.navigation}>
                      <button onClick={() => navigate(Math.max(0, index - 1))} disabled={index === 0} aria-label="Previous project"><ChevronLeft size={20} /></button>
                      <button onClick={() => navigate(Math.min(projects.length - 1, index + 1))} disabled={index === projects.length - 1} aria-label="Next project"><ChevronRight size={20} /></button>
                    </div>
                  </div>
                  <AnimatedHeading scrollControlled={index > 0} id={index === 0 ? 'projects-title' : undefined}>{chapterHeadings[index].lead}<br /><span className="heading-accent">{chapterHeadings[index].accent}</span></AnimatedHeading>
                  <p className={styles.introduction}>Residential and commercial spaces across Faisal Margalla City, Bahria Enclave and Grand City, Kharian. Discover the Rahat Associates portfolio.</p>
                </header>
              <div className={styles.info}>
                <span className={styles.number} aria-hidden="true">{pad(index + 1)}</span>
                <div className={styles.details}>
                  <h3 id={`showcase-${project.id}`}>{project.name}</h3>
                  <p className={styles.feature}>{project.description}</p>
                </div>
              </div>
              <div className={styles.actions}>
                    <ProjectButton project={project} className={styles.link} label={`View ${project.name}`}>
                      View Project <span><ArrowRight size={21} aria-hidden="true" /></span>
                    </ProjectButton>
                    <a href={project.brochure} download className={styles.brochure} aria-label={`Download ${project.name} brochure`}><Download size={19} />Download Brochure</a>
              </div>
              <div className={styles.traits}>
                <span><Building2 size={27} strokeWidth={1.3} />{project.category}</span>
                <span><MapPin size={27} strokeWidth={1.3} />{project.location}</span>
                <span><Layers3 size={27} strokeWidth={1.3} />Original plans<br />Developer brochure</span>
              </div>
            </div>
            <div className={styles.media}>
              <div className={styles.imageFrame}><Image src={project.image} alt={`${project.name} architectural exterior render, ${project.location}`} fill sizes="(max-width: 899px) 90vw, 50vw" quality={90} style={{ objectPosition: project.focus }} /></div>
              <ProjectButton project={project} className={styles.category} label={`Explore ${project.name}`}><Building2 size={23} strokeWidth={1.4} /><span>{project.category}</span><i><ArrowRight size={18} /></i></ProjectButton>
              <div className={styles.locationBadge}><div><MapPin size={31} strokeWidth={1.4} /><strong>{project.location}</strong></div><p>Rahat Associates<span>Estate & Builders</span><ArrowUpRight size={20} /></p></div>
              <div className={styles.projectBadge}><span><Building2 size={32} strokeWidth={1.3} /></span><div><strong>{project.name}</strong><small>{project.spaces.join(' · ')}</small></div></div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
