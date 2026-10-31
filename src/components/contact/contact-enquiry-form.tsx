'use client';
import { useRef, useState, type FormEvent } from 'react';
import Image from 'next/image';
import { UserRound, Phone, Mail, Building2, MessageCircle, House, FileText, ArrowRight, LockKeyhole } from 'lucide-react';
import { portfolioProjects } from '@/data/project-portfolio';
import { contact } from '@/data/projects';
import { propertyOptions } from '@/data/quotation';
import { quotationWhatsAppUrl } from '@/lib/quotation';
import { enquiryTypes, formatContact, validateContact, type ContactValues } from '@/lib/contact-enquiry';
import styles from './contact-portfolio.module.css';

export function ContactEnquiryForm({ initialProject }: { initialProject: string }) {
  const [values, setValues] = useState<ContactValues>({ name: '', phone: '', email: '', project: initialProject, type: '', property: '', message: '', consent: false });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactValues, string>>>({});
  const [prepared, setPrepared] = useState<string | null>(null);
  const form = useRef<HTMLFormElement>(null);
  function update<K extends keyof ContactValues>(key: K, value: ContactValues[K]) {
    setValues((v) => ({ ...v, [key]: value, ...(key === 'project' ? { type: '', property: '' } : {}) }));
    setErrors((e) => ({ ...e, [key]: undefined, ...(key === 'project' ? { type: undefined, property: undefined } : {}) })); setPrepared(null);
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validateContact(values); setErrors(next);
    const first = Object.keys(next)[0];
    if (first) { form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus(); return; }
    const url = quotationWhatsAppUrl(contact.whatsapp, formatContact(values)); setPrepared(url);
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  }
  const attrs = (key: keyof ContactValues) => ({ id: `contact-${key}`, name: key, 'aria-invalid': Boolean(errors[key]), 'aria-describedby': errors[key] ? `contact-${key}-error` : undefined });
  const error = (key: keyof ContactValues) => errors[key] && <small id={`contact-${key}-error`} className={styles.error} role="alert">{errors[key]}</small>;
  return <div className={styles.formPanel}><Image className={styles.formLogo} src="/media/logo.png" alt="Rahat Associates" width={130} height={49} /><p className={styles.eyebrow}>Get in touch</p><h2>Tell Us What You&apos;re<br /><em>Looking For.</em></h2><p className={styles.formIntro}>Share your requirements and our team will help you explore the options across our developments.</p><form ref={form} onSubmit={submit} noValidate className={styles.form}>
    <div className={styles.field}><label htmlFor="contact-name">Full Name *</label><div className={styles.inputWrap}><UserRound size={19} aria-hidden="true" /><input {...attrs('name')} required autoComplete="name" maxLength={100} placeholder="Your full name" value={values.name} onChange={(e) => update('name', e.target.value)} /></div>{error('name')}</div>
    <div className={styles.field}><label htmlFor="contact-phone">Phone / WhatsApp *</label><div className={styles.inputWrap}><Phone size={19} aria-hidden="true" /><input {...attrs('phone')} required type="tel" autoComplete="tel" maxLength={30} placeholder="Your phone number" value={values.phone} onChange={(e) => update('phone', e.target.value)} /></div>{error('phone')}</div>
    <div className={`${styles.field} ${styles.full}`}><label htmlFor="contact-email">Email Address</label><div className={styles.inputWrap}><Mail size={19} aria-hidden="true" /><input {...attrs('email')} type="email" autoComplete="email" maxLength={254} placeholder="Your email (optional)" value={values.email} onChange={(e) => update('email', e.target.value)} /></div>{error('email')}</div>
    <div className={`${styles.field} ${styles.full}`}><label htmlFor="contact-project">Interested Project *</label><div className={styles.inputWrap}><Building2 size={19} aria-hidden="true" /><select {...attrs('project')} required value={values.project} onChange={(e) => update('project', e.target.value)}><option value="">Select a project</option>{portfolioProjects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}<option value="guidance">General Enquiry</option></select></div>{error('project')}</div>
    <div className={styles.field}><label htmlFor="contact-type">Enquiry Type *</label><div className={styles.inputWrap}><MessageCircle size={19} aria-hidden="true" /><select {...attrs('type')} required value={values.type} onChange={(e) => update('type', e.target.value)}><option value="">Select enquiry type</option>{enquiryTypes(values.project).map((t) => <option key={t}>{t}</option>)}</select></div>{error('type')}</div>
    <div className={styles.field}><label htmlFor="contact-property">Property Type</label><div className={styles.inputWrap}><House size={19} aria-hidden="true" /><select {...attrs('property')} value={values.property} onChange={(e) => update('property', e.target.value)}><option value="">Optional preference</option>{propertyOptions(values.project).map((p) => <option key={p}>{p}</option>)}</select></div>{error('property')}</div>
    {values.project === 'rahat-heights' && <p className={`${styles.hint} ${styles.full}`}>Long-term rental enquiries are supported by the supplied Rahat Heights inventory; please confirm current availability.</p>}
    <div className={`${styles.field} ${styles.full}`}><label htmlFor="contact-message">Message / Requirements *</label><div className={styles.inputWrap}><FileText size={19} aria-hidden="true" /><textarea {...attrs('message')} rows={4} required maxLength={2000} placeholder="Tell us about your requirements, preferred location, budget or any specific details..." value={values.message} onChange={(e) => update('message', e.target.value)} /></div>{error('message')}</div>
    <div className={styles.full}><label className={styles.consent} htmlFor="contact-consent"><input {...attrs('consent')} required type="checkbox" checked={values.consent} onChange={(e) => update('consent', e.target.checked)} /><span>I understand that my details will be included in a WhatsApp draft, which I can review and send myself.</span></label>{error('consent')}</div>
    <button className={`${styles.primary} ${styles.full}`} type="submit">Continue to WhatsApp <ArrowRight size={18} /></button>
    {prepared && <p className={`${styles.status} ${styles.full}`} role="status">Your draft is ready. Nothing has been sent or stored by this website. <a href={prepared} target="_blank" rel="noopener noreferrer">Review in WhatsApp</a></p>}
    <p className={`${styles.privacy} ${styles.full}`}><LockKeyhole size={18} />Your information creates a WhatsApp message. No enquiry data is stored on this website.</p>
  </form></div>;
}
