'use client';
import Image from 'next/image';
import { useState, type FormEvent } from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { Modal } from './dialogs';
import { portfolioProjects, type PortfolioProject } from '@/data/project-portfolio';
import { contact } from '@/data/projects';
import { normalizePhone, quotationWhatsAppUrl } from '@/lib/quotation';
import styles from '../projects/projects-portfolio.module.css';

export function ProjectLeadModal({ initial, close, context, service, unit }: { initial: PortfolioProject; close: () => void; context?: { floor: string; layout: string }; service?: string; unit?: string }) {
  const [projectId, setProjectId] = useState(initial.id);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [prepared, setPrepared] = useState<string | null>(null);
  const project = portfolioProjects.find((p) => p.id === projectId)!;
  const selectedContext = projectId === initial.id ? context : undefined;
  const selectedUnit = projectId === initial.id ? unit : undefined;
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget).entries());
    const name = String(values.name ?? '').trim();
    const phone = normalizePhone(String(values.phone ?? ''));
    const email = String(values.email ?? '').trim();
    const next: Record<string, string> = {};
    if (name.length < 2) next.name = 'Please enter your full name.';
    if (!phone) next.phone = 'Enter a valid phone number, including country code if outside Pakistan.';
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Please enter a valid email or leave it blank.';
    if (!values.consent) next.consent = 'Please acknowledge the WhatsApp enquiry.';
    setErrors(next);
    if (Object.keys(next).length) {
      event.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }
    const message = `Hello Rahat Associates,\n\nI would like to request more information about ${project.name}.${selectedUnit ? `\nUnit: ${selectedUnit}` : ''}${service ? `\nService: ${service}` : ''}${selectedContext ? `\nFloor: ${selectedContext.floor}\nLayout: ${selectedContext.layout}` : ''}\n\nName: ${name}\nPhone: ${phone}${email ? `\nEmail: ${email}` : ''}\nInterested In: ${values.interest}\nProperty Type: ${values.property}${values.budget ? `\nBudget: ${values.budget}` : ''}${values.message ? `\n\nMy Requirements:\n${values.message}` : ''}\n\nPlease share the current project details, starting prices, availability and relevant floor plans.\n\nThank you.`;
    const url = quotationWhatsAppUrl(contact.whatsapp, message);
    setPrepared(url);
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  }
  return <Modal open close={close} label={`Request details for ${project.name}`} className={styles.leadModal}>
    <aside className={styles.leadArt}><Image src={project.image} alt={`${project.name} architectural render`} fill sizes="340px" /><div><small>YOUR NEXT ADDRESS</small><h3>{project.name}</h3><p><MapPin size={14} />{project.location}</p><span>Explore the possibilities with our team.</span></div></aside>
    <form className={styles.form} onSubmit={submit} onChange={(event) => {
      setPrepared(null);
      const name = event.target.getAttribute('name');
      if (!name) return;
      setErrors((current) => { const next = { ...current }; delete next[name]; return next; });
    }} noValidate data-lenis-prevent>
      <p className={styles.eyebrow}>A conversation starts here</p><h2>Get Project Details.</h2><p>Share your requirements and our team will help you explore the project.</p>
      <div className={styles.fields}>
        {selectedUnit && <label className={styles.full}>Selected unit<input value={selectedUnit} readOnly /></label>}
        {service && <label className={styles.full}>Selected service<input value={service} readOnly /></label>}
        {selectedContext && <><label>Selected floor<input value={selectedContext.floor} readOnly /></label><label>Selected layout<input value={selectedContext.layout} readOnly /></label></>}
        <label>Full Name *<input name="name" autoComplete="name" maxLength={100} required aria-invalid={Boolean(errors.name)} />{errors.name && <small role="alert">{errors.name}</small>}</label>
        <label>Phone / WhatsApp *<input name="phone" type="tel" autoComplete="tel" maxLength={30} required aria-invalid={Boolean(errors.phone)} />{errors.phone && <small role="alert">{errors.phone}</small>}</label>
        <label>Email Address<input name="email" type="email" autoComplete="email" maxLength={254} aria-invalid={Boolean(errors.email)} />{errors.email && <small role="alert">{errors.email}</small>}</label>
        <label>Project<select name="project" value={projectId} onChange={(e) => { setProjectId(e.target.value as PortfolioProject['id']); setPrepared(null); }}>{portfolioProjects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</select></label>
        <label>Interested In<select name="interest" key={`interest-${projectId}`}><option>Buying</option>{project.rental && <option>Renting</option>}<option>General Information</option></select></label>
        <label>Property Type<select name="property" key={`property-${projectId}`}>{project.spaces.map((space) => <option key={space}>{space}</option>)}</select></label>
        <label className={styles.full}>Budget Range (optional)<input name="budget" maxLength={100} placeholder="Your preferred budget" /></label>
        <label className={styles.full}>Message / Requirements<textarea name="message" rows={2} maxLength={2000} /></label>
      </div>
      <label className={styles.consent}><input type="checkbox" name="consent" required /><span>I understand that continuing opens WhatsApp with the information I entered, for me to review and send.</span></label>
      {errors.consent && <p className={styles.error} role="alert">{errors.consent}</p>}
      <div className={styles.actions}><button className={styles.primary} type="submit">Continue to WhatsApp <ArrowRight size={17} /></button><button className={styles.close} type="button" onClick={close}>Close</button></div>
      {prepared && <p role="status" className={styles.prepared}>Your draft is ready; nothing has been sent by this website. <a href={prepared} target="_blank" rel="noopener noreferrer">Review in WhatsApp</a></p>}
    </form>
  </Modal>;
}
