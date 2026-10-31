'use client';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowRight, Building2, Layers3, MapPin, Download, MessageCircle, FileText, ChevronLeft, ChevronRight, Ruler, Frame } from 'lucide-react';
import { portfolioProjects } from '@/data/project-portfolio';
import { explorerPlans } from '@/data/explorer-plans';
import { contact } from '@/data/projects';
import { quotationWhatsAppUrl } from '@/lib/quotation';
import { Modal } from '@/components/site/dialogs';
import { ProjectLeadModal } from '@/components/site/project-lead-modal';
import { PlanViewer } from './plan-viewer';
import styles from './explorer.module.css';

export function FloorPlanExplorer() {
  const params = useSearchParams(), router = useRouter();
  const project = portfolioProjects.find((p) => p.id === params.get('project')) ?? portfolioProjects[0];
  const plans = explorerPlans.filter((p) => p.projectId === project.id);
  const requested = params.get('plan');
  const plan = plans.find((p) => p.id === requested || (requested === 'ground-floor' && p.id.includes('-ground-'))) ?? plans.find((p) => p.id.includes('-ground-')) ?? plans[0];
  const [expanded, setExpanded] = useState(false), [lead, setLead] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  function select(projectId: string, planId?: string) {
    const next = new URLSearchParams(); next.set('project', projectId);
    if (planId) next.set('plan', planId);
    router.replace(`/floor-plans?${next}`, { scroll: false });
  }
  const whatsapp = quotationWhatsAppUrl(contact.whatsapp, `Hello Rahat Associates, please share details, current availability and pricing for ${project.name}.\nFloor: ${plan.floors}\nLayout: ${plan.title} (${plan.use}).`)!;
  const move = (step: number) => select(project.id, plans[(plans.indexOf(plan) + step + plans.length) % plans.length].id);
  return <main id="main">
    <section className={styles.hero} id="home" aria-labelledby="floor-plans-title"><div className={styles.heroBackdrop} aria-hidden="true"><Image src="/media/floor-plans-blueprint-hero.webp" alt="" fill sizes="100vw" loading="eager" quality={90}/></div><div className={styles.heroCopy}><p className={styles.eyebrow}>Explore our developments</p><h1 id="floor-plans-title"><span>Designed Spaces.</span><br /><em>Thoughtful Layouts.</em></h1><p>Explore the architectural floor plans of our residential and commercial developments, from modern apartments to thoughtfully arranged commercial spaces.</p></div><a className={styles.heroBadge} href="#explorer-panel"><FileText size={35}/><span><strong>Original drawings</strong><small>Explore every detail.</small></span><ArrowRight size={20}/></a><div className={styles.heroBenefits} aria-label="Floor plan features"><span><Layers3/>Smart layouts</span><span><Frame/>Maximum<br/>space utility</span><span><Ruler/>Detailed<br/>dimensions</span></div></section>
    <div className={styles.wrap}>
      <div role="tablist" aria-label="Floor plan projects" className={styles.projectTabs}>{portfolioProjects.map((p, i) => <button ref={(el) => { tabs.current[i] = el; }} key={p.id} role="tab" id={`project-${p.id}`} aria-controls="explorer-panel" aria-selected={p.id === project.id} tabIndex={p.id === project.id ? 0 : -1} onClick={() => select(p.id)} onKeyDown={(e) => { let next: number | undefined; if (e.key === 'ArrowRight') next = (i + 1) % 3; if (e.key === 'ArrowLeft') next = (i + 2) % 3; if (e.key === 'Home') next = 0; if (e.key === 'End') next = 2; if (next !== undefined) { e.preventDefault(); select(portfolioProjects[next].id); tabs.current[next]?.focus(); } }}><Image src={p.image} alt="" width={72} height={72} /><span><strong>{p.name}</strong><small>{p.location}</small></span><ArrowRight size={20} /></button>)}</div>
      <section role="tabpanel" id="explorer-panel" aria-labelledby={`project-${project.id}`} className={styles.explorer}>
        <aside className={styles.floorNav}><p className={styles.eyebrow}>Available layouts</p><h2>{project.name}</h2><div>{plans.map((p) => <button key={p.id} aria-pressed={p.id === plan.id} onClick={() => select(project.id, p.id)}><Layers3 size={18} /><span>{p.title}<small>{p.use}</small></span><ArrowRight size={14} /></button>)}</div><p className={styles.sourceNote}>Original brochure drawings. Shared layouts retain their documented floor ranges.</p></aside>
        <div className={styles.planPanel}><div className={styles.planHeading}><div><h2>{plan.title}</h2><p>{plan.use} · {plan.floors}</p></div><span>Original plan</span></div><PlanViewer key={plan.id} image={plan.image} title={`${project.name} · ${plan.title}`} expand={() => setExpanded(true)} /><div className={styles.thumbnails}><button aria-label="Previous layout" onClick={() => move(-1)}><ChevronLeft size={19} /></button><div>{plans.map((p) => <button key={p.id} onClick={() => select(project.id, p.id)} aria-pressed={p.id === plan.id} aria-label={`Select ${p.title}`}><Image src={p.image} alt="" width={160} height={110} /><span>{p.floors}</span></button>)}</div><button aria-label="Next layout" onClick={() => move(1)}><ChevronRight size={19} /></button></div></div>
        <aside className={styles.info}><p className={styles.eyebrow}>Your selected plan</p><h2>{project.name}</h2><p className={styles.location}><MapPin size={16} />{project.location}</p><span className={styles.tag}>{plan.use}</span><p className={styles.description}>{plan.description}</p><dl><div><dt><Layers3 size={18} />Floor group</dt><dd>{plan.floors}</dd></div><div><dt><Building2 size={18} />Drawing type</dt><dd>Building-floor layout</dd></div><div><dt><FileText size={18} />Source</dt><dd>Project brochure · page {plan.page}</dd></div></dl><button className={styles.primary} onClick={() => setLead(true)}>Request Floor Details <ArrowRight size={17} /></button><a href={whatsapp} target="_blank" rel="noopener noreferrer" className={styles.whatsapp}><MessageCircle size={19} />Chat on WhatsApp</a><a className={styles.download} href={plan.image} download={`${project.id}-${plan.id}-floor-plan.webp`}><Download size={23} /><span><strong>Download Floor Plan</strong><small>Original high-resolution WebP drawing</small></span></a><p className={styles.sourceNote}>Illustrative brochure specifications. Confirm current layouts and availability with our team. No unit pricing is published here.</p></aside>
      </section>
      <section className={styles.collection}><div className={styles.collectionHeading}><div><p className={styles.eyebrow}>Our projects</p><h2>Explore layouts <em>by project.</em></h2></div><p>Original architectural drawings.<br />Three distinct addresses to explore.</p></div><div className={styles.cards}>{portfolioProjects.map((p) => <article key={p.id}><button className={styles.cardHeader} onClick={() => select(p.id)}><Image src={p.image} alt={`${p.name} architectural render`} width={68} height={68} /><span><strong>{p.name}</strong><small>{p.location}</small></span><ArrowRight size={20} /></button><div>{explorerPlans.filter((item) => item.projectId === p.id).slice(0, 3).map((item) => <button key={item.id} onClick={() => { select(p.id, item.id); document.getElementById('explorer-panel')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); }}><Image src={item.image} alt={`${p.name} · ${item.title}`} width={180} height={120} /><span>{item.floors}</span></button>)}</div></article>)}</div></section>
    </div>
    <section className={styles.cta}><div className={styles.ctaArt} aria-hidden="true"><Image src="/media/project-consultation.avif" alt="" fill sizes="30vw" /></div><div><p className={styles.eyebrow}>Need guidance?</p><h2>Need help choosing<br /><em>the right layout?</em></h2></div><div><p>Our team is here to guide you through floor plans,<br />availability and the options for your needs.</p><button className={styles.primary} onClick={() => setLead(true)}>Project enquiry <ArrowRight size={17} /></button></div></section>
    <Modal open={expanded} close={() => setExpanded(false)} label={`${project.name} · ${plan.title}, full-screen viewer`} className={styles.fullscreen}><h2>{project.name} · {plan.title}</h2><PlanViewer key={`full-${plan.id}`} image={plan.image} title={`${project.name} · ${plan.title}`} large /></Modal>
    {lead && <ProjectLeadModal initial={project} context={{ floor: plan.floors, layout: `${plan.title} · ${plan.use}` }} close={() => setLead(false)} />}
  </main>;
}
