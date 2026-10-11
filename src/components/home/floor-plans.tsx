'use client';

import Image from 'next/image';
import { AnimatedHeading } from '@/components/motion/animated-heading';
import { useRef, useState } from 'react';
import { Building2, ChevronRight, Download, FileText, Layers3, Maximize2, ScanLine } from 'lucide-react';
import { projects } from '@/data/projects';
import { floorPlans } from '@/data/floor-plans';
import { Lightbox } from '@/components/site/dialogs';
import { Reveal } from '@/components/motion/reveal';
import styles from './floor-plans.module.css';
import { FloorPlanSelect } from './floor-plan-select';

export function FloorPlans() {
  const [projectIndex, setProjectIndex] = useState(0);
  const [planIndex, setPlanIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const project = projects[projectIndex];
  const plans = floorPlans.filter((plan) => plan.projectId === project.id);
  const plan = plans[planIndex];
  const selectProject = (index: number) => { setProjectIndex(index); setPlanIndex(0); };
  const metrics = [
    { icon: Layers3, label: 'Floors', value: plan.floors },
    { icon: Building2, label: 'Spaces', value: plan.use },
    { icon: ScanLine, label: 'Drawing', value: 'Original floor plan' },
    { icon: FileText, label: 'Brochure', value: `Page ${plan.page}` },
  ];

  return (
    <section id="floor-plans" className={styles.section} aria-labelledby="floor-plans-title">
      <div className={styles.backdrop} aria-hidden="true"><Image src={project.image} alt="" fill sizes="45vw" /></div>
      <span className={styles.brand} aria-hidden="true">Rahat<br />Associates</span>
      <div className="wrap">
        <div className={styles.header}>
          <Reveal>
            <p className={styles.eyebrow}>Floor plans</p>
            <AnimatedHeading id="floor-plans-title">Thoughtful layouts.<br /><span className="heading-accent">Spaces to make your own.</span></AnimatedHeading>
          </Reveal>
          <div className={styles.tabs} role="tablist" aria-label="Floor plan projects">
            {projects.map((item, index) => (
              <button key={item.id} ref={(el) => { tabs.current[index] = el; }} role="tab" id={`plan-tab-${item.id}`} aria-controls="floor-plan-panel" aria-selected={index === projectIndex} tabIndex={index === projectIndex ? 0 : -1} onClick={() => selectProject(index)} onKeyDown={(event) => {
                let next: number | undefined;
                if (event.key === 'ArrowRight') next = (index + 1) % projects.length;
                if (event.key === 'ArrowLeft') next = (index + projects.length - 1) % projects.length;
                if (event.key === 'Home') next = 0;
                if (event.key === 'End') next = projects.length - 1;
                if (next !== undefined) { event.preventDefault(); selectProject(next); tabs.current[next]?.focus(); }
              }}><Building2 size={20} strokeWidth={1.3} /><span>{item.name}</span>{index === projectIndex && <ChevronRight size={16} />}</button>
            ))}
          </div>
        </div>

        <div id="floor-plan-panel" role="tabpanel" aria-labelledby={`plan-tab-${project.id}`} className={styles.panel}>
          <div className={styles.details}>
            <p className={styles.location}>{project.location}</p>
            <h3>{project.name}</h3>
            <p className={styles.copy}>{plan.description}</p>
            <FloorPlanSelect key={project.id} options={plans} selectedIndex={planIndex} onSelect={setPlanIndex} />
            <dl className={styles.metrics}>
              {metrics.map(({ icon: Icon, label, value }) => <div key={label}><dt><Icon size={19} strokeWidth={1.3} />{label}</dt><dd>{value}</dd></div>)}
            </dl>
            <a className={styles.brochure} href={`${project.brochure}#page=${plan.page}`} target="_blank" rel="noopener noreferrer"><Download size={22} />View project brochure <ChevronRight size={18} /></a>
          </div>
          <div key={plan.id} className={styles.visual}>
            {plan.drawings ? <div className={styles.drawings}>
              {plan.drawings.map((drawing, index) => <figure key={drawing.image} className={styles.drawing}>
                <figcaption><span>{String(index + 1).padStart(2, '0')}</span><h4>{drawing.title}</h4></figcaption>
                <button className={styles.drawingImage} onClick={() => setExpanded(true)} aria-label={`Enlarge ${project.name} ${drawing.title}`}><Image src={drawing.image} alt={`${project.name} — ${drawing.title}, original brochure drawing`} fill sizes="(max-width: 600px) 80vw, 28vw" quality={90} /></button>
              </figure>)}
            </div> : <button className={styles.plan} onClick={() => setExpanded(true)} aria-label={`Enlarge ${project.name} ${plan.title}`}>
              <Image src={plan.image} alt={`${project.name} — ${plan.title}, original brochure page ${plan.page}`} fill sizes="(max-width: 600px) 90vw, (max-width: 800px) 56vw, 65vw" quality={90} />
            </button>}
            <div className={styles.visualFooter}><p className={styles.caption}>{plan.title}<span>Developer brochure · p. {plan.page}</span></p><button className={styles.zoom} onClick={() => setExpanded(true)} aria-label={`Enlarge ${project.name} ${plan.title}`}><Maximize2 size={18} /> Enlarge plan</button></div>
          </div>
        </div>
      </div>
      <Lightbox items={plans.map((item) => ({ ...item, title: `${project.name} — ${item.title}`, kind: `Original brochure · page ${item.page}` }))} index={expanded ? planIndex : -1} onClose={() => setExpanded(false)} onMove={(direction) => setPlanIndex((planIndex + direction + plans.length) % plans.length)} />
    </section>
  );
}
