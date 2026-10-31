'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowRight, Building2, MapPin, MessageCircle, ShieldCheck, Dumbbell, Layers3, CarFront, Expand, Check, House, UsersRound } from 'lucide-react';
import { Lightbox } from '@/components/site/dialogs';
import { Reveal } from '@/components/motion/reveal';
import { portfolioProjects, type PortfolioProject } from '@/data/project-portfolio';
import { contact } from '@/data/projects';
import { quotationWhatsAppUrl } from '@/lib/quotation';
import styles from './projects-portfolio.module.css';
import { ProjectLeadModal } from '@/components/site/project-lead-modal';

const icons = [Dumbbell, Layers3, ShieldCheck, CarFront];
type Media = { id: string; title: string; kind: string; image: string };


export function ProjectsPortfolio() {
  const router = useRouter();
  const [lead, setLead] = useState<PortfolioProject | null>(null);
  const [media, setMedia] = useState<Media[]>([]);
  const [index, setIndex] = useState(-1);
  const openMedia = (items: Media[], selected = 0) => { setMedia(items); setIndex(selected); };
  return <main id="main" className={styles.page}>
    <section className={styles.hero} id="home" aria-labelledby="projects-title">
      <div className={styles.horizon} aria-hidden="true"><Image src="/media/projects-sunset-hero.webp" alt="" fill sizes="100vw" quality={90} loading="eager" fetchPriority="high" /></div>
      <div className={styles.heroInner}><div aria-hidden="true" style={{ height: 22 }} /><p className={styles.eyebrow}>Our developments</p><h1 id="projects-title">Developments<br /><span>Designed <em>Around You.</em></span></h1><p className={styles.heroCopy}>Explore Rahat Associates&apos; residential and commercial developments across Islamabad and Kharian, bringing spaces for living and business together.</p><ul className={styles.heroFeatures}><li><Building2 /><span><strong>Prime Locations</strong><small>Connected communities</small></span></li><li><House /><span><strong>Modern Design</strong><small>Quality construction</small></span></li><li><UsersRound /><span><strong>Greater Value</strong><small>For a stronger tomorrow</small></span></li></ul></div>
      <div className={styles.heroBadge}>{[{ label: 'Prime Locations', icon: MapPin }, { label: 'Modern Design', icon: Building2 }, { label: 'Stronger Communities', icon: UsersRound }].map(({ label, icon: Icon }) => <div key={label}><span><Icon /></span><strong>{label}<i /></strong></div>)}</div>
    </section>
    <nav className={styles.projectNav} aria-label="Project navigation">{portfolioProjects.map((p) => <a key={p.id} href={`#${p.id}`}><Image src={p.image} alt="" width={66} height={66} /><span><strong>{p.name}</strong><small>{p.location}</small></span><ArrowRight size={20} /></a>)}</nav>
    <div id="developments">{portfolioProjects.map((p, order) => {
      const gallery = [{ id: `${p.id}-exterior`, title: p.name, kind: 'Architectural render', image: p.image }, ...(p.detail !== p.image ? [{ id: `${p.id}-detail`, title: p.name, kind: 'Architectural render, façade detail', image: p.detail }] : [])];
      const whatsapp = quotationWhatsAppUrl(contact.whatsapp, `Hello Rahat Associates, I am interested in ${p.name}, ${p.location}. Please share current details, starting prices and availability.`)!;
      return <section id={p.id} key={p.id} className={`${styles.showcase} ${order % 2 ? styles.reverse : ''}`} aria-labelledby={`${p.id}-title`}>
        <div className={styles.projectInner}>
          <Reveal className={styles.info}><p className={styles.eyebrow}>{p.eyebrow}</p><h2 id={`${p.id}-title`}>{p.name}</h2><p className={styles.location}><MapPin size={19} />{p.location}</p><div className={styles.tags}>{p.spaces.map((s) => <span key={s}>{s}</span>)}</div><p className={styles.description}>{p.description}</p>
            <div className={styles.price}>{p.pricing.map((price) => <div key={price.category}><small>{price.category}, starting from</small><strong>{price.amount}</strong></div>)}</div><p className={styles.note}>{p.priceNote}</p>
            <div className={styles.amenities}>{p.amenities.map((a, i) => { const Icon = order === 1 ? [Building2, Building2, Layers3, Layers3][i] : icons[i]; return <div key={a}><span><Icon size={26} strokeWidth={1.5} /></span><small>{a}</small></div>; })}</div>
            <div className={styles.actions}><button className={styles.primary} onClick={() => setLead(p)}>Request Project Details <ArrowRight size={18} /></button><a href={whatsapp} target="_blank" rel="noopener noreferrer" className={styles.whatsapp}><MessageCircle size={19} />Chat on WhatsApp</a></div>
            <details className={styles.specs}><summary>Property types &amp; project specifications</summary><ul>{p.specifications.map((s) => <li key={s}><Check size={15} />{s}</li>)}</ul><p>Areas are from supplied source documents; layouts and brochure facilities are subject to confirmation.</p></details>
          </Reveal>
          <Reveal className={styles.visual} variant="mask"><button className={`${styles.mainImage} ${order === 1 ? styles.wideRender : ''}`} onClick={() => openMedia(gallery)} aria-label={`Open ${p.name} gallery`}><Image src={p.image} alt={`${p.name} architectural render`} fill sizes="(max-width: 800px) 100vw, 55vw" quality={90} /><span className={styles.renderTag}>Architectural render <Expand size={14} /></span></button>
            <div className={styles.floatingSpecs}>{p.spaces.slice(0, 3).map((s) => <span key={s}><Building2 size={16} />{s}</span>)}</div>
            <div className={styles.thumbnails}><button onClick={() => openMedia(gallery, gallery.length - 1)} aria-label={`View ${p.name} architectural details`}><Image src={p.detail} alt={`${p.name} brochure architectural detail`} fill sizes="20vw" /><span>Explore the architecture <Expand size={13} /></span></button>{p.plans.slice(0, 2).map((plan, n) => <button key={plan.id} onClick={() => n === 0 ? router.push(`/floor-plans?project=${p.id}`) : openMedia(p.plans, n)} aria-label={`View ${plan.title}`}><Image src={plan.image} alt={plan.title} fill sizes="20vw" /><span>{n ? 'More floor plans' : 'View floor plans'} <ArrowRight size={14} /></span></button>)}</div>
          </Reveal>
        </div>
      </section>;
    })}</div>
    <section className={styles.cta} id="quotation"><div><p className={styles.eyebrow}>Let&apos;s build together</p><h2>Start Your Property Journey<br /><em>With Rahat Associates.</em></h2><p>Get project details, floor plans and guidance from our team.</p></div><div className={styles.actions}><button className={styles.primary} onClick={() => setLead(portfolioProjects[0])}>Project enquiry <ArrowRight size={18} /></button><Link className={styles.secondary} href="/about#office">Contact us <ArrowRight size={18} /></Link></div></section>
    <Lightbox items={media} index={index} onClose={() => setIndex(-1)} onMove={(direction) => setIndex((value) => (value + direction + media.length) % media.length)} />
    {lead && <ProjectLeadModal initial={lead} close={() => setLead(null)} />}
  </main>;
}
