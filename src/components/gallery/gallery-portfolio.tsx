'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, Camera, Images, Play, Building2, X, MapPin } from 'lucide-react';
import { galleryMedia, unitAlbums } from '@/data/gallery-media';
import type { GalleryMedia } from '@/data/gallery-media-types';
import { portfolioProjects } from '@/data/project-portfolio';
import { InstagramReels } from '@/components/home/instagram-reels';
import { ProjectLeadModal } from '@/components/site/project-lead-modal';
import { MediaViewer } from './media-viewer';
import styles from './gallery-portfolio.module.css';

const categories = [{ id: 'all', label: 'All Media', icon: Images }, { id: 'exterior', label: 'Project Exteriors', icon: Building2 }, { id: 'interior', label: 'Interiors', icon: Camera }, { id: 'units', label: 'Unit Galleries', icon: Images }, { id: 'video', label: 'Videos & Reels', icon: Play }];
export function GalleryPortfolio() {
  const query = useSearchParams();
  const project = portfolioProjects.some((p) => p.id === query.get('project')) ? query.get('project')! : 'all';
  const category = categories.some((c) => c.id === query.get('category')) ? query.get('category')! : 'all';
  const [viewer, setViewer] = useState<{ items: GalleryMedia[]; index: number } | null>(null);
  const [lead, setLead] = useState<{ projectId: string; unit?: string } | null>(null);
  const projectMedia = galleryMedia.filter((m) => project === 'all' || m.projectId === project);
  const pictures = projectMedia.filter((m) => m.kind === 'image' && (category === 'all' || m.category === category));
  const albums = unitAlbums.filter((a) => project === 'all' || a.projectId === project);
  const films = projectMedia.filter((m) => m.kind === 'video');
  function filter(nextProject?: string, nextCategory?: string) {
    const current = new URLSearchParams(window.location.search);
    const selectedProject = nextProject ?? current.get('project') ?? 'all';
    const selectedCategory = nextCategory ?? current.get('category') ?? 'all';
    const params = new URLSearchParams();
    if (selectedProject !== 'all') params.set('project', selectedProject);
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    window.history.replaceState(null, '', `/gallery${params.size ? `?${params}` : ''}`);
  }
  function open(item: GalleryMedia) {
    const sequence = projectMedia.filter((m) => m.projectId === item.projectId && m.kind === item.kind && (!item.unit || m.unit === item.unit));
    setViewer({ items: sequence, index: sequence.findIndex((m) => m.id === item.id) });
  }
  const empty = (message: string) => <div className={styles.empty}><Camera size={34} strokeWidth={1.2} /><h3>{message}</h3><p>Explore another project or clear your filters to view the complete collection.</p><button onClick={() => filter('all', 'all')}>Clear Filters <X size={14} /></button></div>;
  const showCollection = ['all', 'exterior', 'interior'].includes(category);
  const filterGroups = <><div role="group" aria-label="Media category">{categories.map(({ id, label, icon: Icon }) => <button key={id} aria-pressed={id === category} onClick={() => filter(undefined, id)}><Icon size={16} />{label}</button>)}</div><div role="group" aria-label="Filter by project"><button aria-pressed={project === 'all'} onClick={() => filter('all')}>All Projects</button>{portfolioProjects.map((p) => <button key={p.id} aria-pressed={project === p.id} onClick={() => filter(p.id)}>{p.name}</button>)}</div></>;
  return <main id="main">
    <section className={styles.hero} id="home" aria-labelledby="gallery-hero-title"><Image src="/media/gallery-warm-story-hero.webp" alt="" aria-hidden="true" fill sizes="100vw" loading="eager" quality={90} /><div className={styles.heroCopy}><p className={styles.eyebrow}>Our gallery</p><h1 id="gallery-hero-title"><span>Every Space</span><br /><em>Has a Story.</em></h1><p>Explore architectural highlights, interiors and project moments from Rahat Associates.</p></div></section>
    {!showCollection && <div className={styles.filterBar}><div className={styles.wrap}>{filterGroups}</div></div>}
    {showCollection && <section className={`${styles.wrap} ${styles.collection}`} id="collection"><div className={styles.heading}><div><p className={styles.eyebrow}>Project gallery</p><h2>A Closer Look at<br /><em>Our Developments.</em></h2></div><p>Architecture, everyday spaces and real interiors.<br />Explore the collection, one perspective at a time.</p></div><div className={`${styles.filterBar} ${styles.filterBarInline}`}>{filterGroups}</div><p className={styles.results} role="status">{pictures.length} photographs &amp; renders in this selection</p>{pictures.length ? <><div className={styles.masonry}>{pictures.map((m) => <button key={m.id} onClick={() => open(m)} className={styles.mediaCard} style={{ aspectRatio: `${m.width ?? 1} / ${m.height ?? 1}` }}><Image src={m.src} alt={m.title} fill sizes="(max-width:480px) 88vw, (max-width:800px) 44vw, (min-width:1800px) 18vw, 23vw" /><span className={styles.mediaLabel}>{m.unit ? `Unit ${m.unit}` : portfolioProjects.find((p) => p.id === m.projectId)!.name}</span><div><span>{m.title}</span><small>{m.isRender ? 'Architectural render' : 'Interior photograph'}</small><Images size={18} /></div></button>)}</div></> : empty('No photographs in this selection yet.')}</section>}
    <section className={`${styles.wrap} ${styles.projects}`} id="project-collections"><p className={styles.eyebrow}>Explore by project</p><h2>Three addresses.<br /><em>Distinct perspectives.</em></h2><div className={styles.projectGrid}>{portfolioProjects.map((p) => <button key={p.id} onClick={() => { filter(p.id, 'all'); document.getElementById('collection')?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); }}><div><Image src={p.image} alt={`${p.name} architectural render`} fill sizes="33vw" /></div><strong>{p.name}<ArrowRight size={18} /></strong><p><MapPin size={13} />{p.location}</p><span>{galleryMedia.filter((m) => m.projectId === p.id).length} media items · Explore gallery</span></button>)}</div></section>
    {['all','units','interior'].includes(category) && (albums.length > 0 || category === 'units') && <section className={styles.units} id="unit-galleries"><div className={styles.wrap}><div className={styles.heading}><div><p className={styles.eyebrow}>Unit galleries</p><h2>Inside Our <em>Spaces.</em></h2></div><p>Selected client-supplied interior photographs.<br />Each album belongs to one individual unit.</p></div>{albums.length ? <div className={styles.albumGrid}>{albums.map((a) => <article key={a.unit}><button className={styles.albumCover} aria-label={`View Unit ${a.unit} album`} onClick={() => setViewer({ items: a.images, index: 0 })}><div className={styles.albumMain}><Image src={a.images[0].src} alt={`Rahat Heights Unit ${a.unit} interior photograph`} fill sizes="30vw" /></div><div className={styles.albumPreview}>{a.images.slice(1, 4).map((m) => <Image key={m.id} src={m.src} alt="" width={90} height={65} />)}</div></button><div className={styles.albumInfo}><h3>Rahat Heights · Unit {a.unit}</h3><p>{a.descriptor}</p><span><Images size={14} />{a.images.length} photos</span><button onClick={() => setViewer({ items: a.images, index: 0 })}>View Album <ArrowRight size={17} /></button><button className={styles.unitEnquiry} onClick={() => setLead({ projectId: a.projectId, unit: a.unit })}>Request Unit Details</button></div></article>)}</div> : empty('No verified unit albums for this project yet.')}</div></section>}
    {['all','video'].includes(category) && (films.length > 0 || category === 'video') && <section className={`${styles.wrap} ${styles.films}`} id="films"><p className={styles.eyebrow}>Behind the developments</p><h2>See Our Projects<br /><em>in Motion.</em></h2><p className={styles.filmCopy}>Client-supplied property walkthroughs. Open a film to watch with playback controls.</p>{films.length ? <div className={styles.filmGrid}>{films.map((m) => <button key={m.id} onClick={() => open(m)}><Image src={m.poster!} alt={`${m.title} video poster`} fill sizes="50vw" /><Play size={45} /><span>{m.title}</span></button>)}</div> : empty('No verified walkthroughs for this project yet.')}</section>}
    {['all','video'].includes(category) && project === 'all' && <div className={styles.reels}><InstagramReels /></div>}
    <section className={styles.cta}><div className={styles.wrap}><div><p className={styles.eyebrow}>Explore more</p><h2>Like What<br /><em>You See?</em></h2><p>Explore our developments or connect with our team for property information, floor plans and current availability.</p></div><div><Link className={styles.primary} href="/projects">Explore Our Projects <ArrowRight size={18} /></Link><button className={styles.outline} onClick={() => setLead({ projectId: project === 'all' ? portfolioProjects[0].id : project })}>Request Details <ArrowRight size={18} /></button></div></div></section>
    {viewer && <MediaViewer items={viewer.items} initial={viewer.index} close={() => setViewer(null)} />}
    {lead && <ProjectLeadModal initial={portfolioProjects.find((p) => p.id === lead.projectId)!} unit={lead.unit} close={() => setLead(null)} />}
  </main>;
}
