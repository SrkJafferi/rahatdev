'use client';

import Image from 'next/image';
import { AnimatedHeading } from '@/components/motion/animated-heading';
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { ArrowRight, Building2, Coins, FileText, House, ListFilter, Mail, MapPin, MessageCircle, Phone, UserRound } from 'lucide-react';
import { contact, projects } from '@/data/projects';
import { budgetOptions, propertyOptions, quotationProjects, rentalEnquiriesEnabled } from '@/data/quotation';
import { formatQuotation, normalizePhone, quotationWhatsAppUrl, validateQuotation, type QuotationErrors, type QuotationValues } from '@/lib/quotation';
import styles from './quotation.module.css';
import { CustomSelect } from '@/components/site/custom-select';

const initialValues: QuotationValues = { name: '', phone: '', email: '', project: '', interest: '', property: '', budget: '', requirements: '', consent: false };
const fieldIcons = { name: UserRound, phone: Phone, email: Mail, project: Building2, interest: ListFilter, property: House, budget: Coins, requirements: FileText, consent: UserRound };

export function Quotation() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<QuotationErrors>({});
  const [message, setMessage] = useState('');
  const form = useRef<HTMLFormElement>(null);
  const whatsappUrl = quotationWhatsAppUrl(contact.whatsapp, message);

  useEffect(() => {
    const preselect = (event: Event) => {
      const id = (event as CustomEvent<string>).detail;
      if (projects.some((item) => item.id === id)) {
        setValues((current) => ({ ...current, project: id, property: '' }));
        setMessage('');
      }
    };
    window.addEventListener('project-enquiry', preselect);
    return () => window.removeEventListener('project-enquiry', preselect);
  }, []);

  function update<K extends keyof QuotationValues>(key: K, value: QuotationValues[K]) {
    setValues((current) => ({ ...current, [key]: value, ...(key === 'project' ? { property: '' } : {}) }));
    setErrors((current) => ({ ...current, [key]: undefined, ...(key === 'project' ? { property: undefined } : {}) }));
    setMessage('');
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateQuotation(values);
    setErrors(nextErrors);
    const invalid = Object.keys(nextErrors)[0];
    if (invalid) {
      form.current?.querySelector<HTMLElement>(`[name="${invalid}"]`)?.focus();
      setMessage('');
      return;
    }
    const prepared = formatQuotation(values);
    setValues((current) => ({ ...current, phone: normalizePhone(current.phone) ?? current.phone }));
    setMessage(prepared);
    const url = quotationWhatsAppUrl(contact.whatsapp, prepared);
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  }

  const field = (key: keyof QuotationValues, label: string, input: ReactNode, full = false) => {
    const Icon = fieldIcons[key];
    return (
    <div className={`${styles.field} ${full ? styles.full : ''}`}>
      <label id={`quote-${key}-label`} htmlFor={`quote-${key}`}>{label}</label>
      <div className={styles.inputWrap}><Icon size={18} strokeWidth={1.5} aria-hidden="true" />{input}</div>
      {errors[key] && <p className={styles.error} id={`quote-${key}-error`}>{errors[key]}</p>}
    </div>
  );
  };
  const accessible = (key: keyof QuotationValues) => ({ id: `quote-${key}`, name: key, 'aria-invalid': !!errors[key], 'aria-describedby': errors[key] ? `quote-${key}-error` : undefined });

  return (
    <section className={styles.section} id="quotation" aria-labelledby="quotation-title">
      <div className={styles.background} aria-hidden="true"><Image src="/media/quotation-apartment-background.avif" alt="" fill sizes="100vw" /></div>
      <div className={styles.layout}>
        <div className={styles.visual}>
          <div className={styles.visualCopy}>
            <p className={styles.eyebrow}>Property enquiries</p>
            <AnimatedHeading>Find Your<br /><em>Ideal Property.</em></AnimatedHeading>
            <p className={styles.introduction}>Explore residential and commercial opportunities across our developments. Share your requirements and connect with our team for property information, pricing and availability.</p>
            <ul className={styles.highlights}>
              <li><span><Building2 size={25} /></span><div><span className={styles.highlightTitle}>Residential &amp; Commercial</span><small>Apartments, shops &amp; offices</small></div></li>
              <li><span><MapPin size={25} /></span><div><span className={styles.highlightTitle}>Project-Specific Enquiries</span><small>Get details for your preferred project</small></div></li>
              <li><span><UserRound size={25} /></span><div><span className={styles.highlightTitle}>Personalized Assistance</span><small>Our team is here to help</small></div></li>
            </ul>
          </div>
        </div>
        <div className={styles.formPanel}>
          <p className={styles.eyebrow}>Let&apos;s connect</p>
          <h2 id="quotation-title">Request a <em>Quotation</em></h2>
          <p className={styles.support}>Tell us what you&apos;re looking for, and our team will help you explore suitable options.</p>
          <form ref={form} noValidate onSubmit={submit} className={styles.form}>
            {field('name', 'Full Name *', <input {...accessible('name')} required autoComplete="name" placeholder="Your full name" maxLength={100} value={values.name} onChange={(event) => update('name', event.target.value)} />)}
            {field('phone', 'Phone / WhatsApp Number *', <input {...accessible('phone')} required type="tel" autoComplete="tel" placeholder="+92 3XX XXXXXXX" maxLength={30} value={values.phone} onChange={(event) => update('phone', event.target.value)} />)}
            {field('email', 'Email Address', <input {...accessible('email')} type="email" autoComplete="email" placeholder="you@example.com" maxLength={254} value={values.email} onChange={(event) => update('email', event.target.value)} />)}
            {field('project', 'Interested Project *', <CustomSelect {...accessible('project')} required value={values.project} onChange={(value) => update('project', value)} options={[{ value: '', label: 'Select a development' }, ...quotationProjects, { value: 'guidance', label: 'Not Sure / Need Guidance' }]} />)}
            {field('interest', 'Interested In *', <><CustomSelect {...accessible('interest')} required value={values.interest} onChange={(value) => update('interest', value)} options={[{ value: '', label: 'Select your interest' }, { value: 'Buy', label: 'Buy' }, { value: 'Rent', label: 'Rent', disabled: !rentalEnquiriesEnabled }, { value: 'General Project Enquiry', label: 'General Project Enquiry' }]} /><span className={styles.hint}>Rental enquiries require confirmed available inventory.</span></>)}
            {field('property', 'Property Type', <CustomSelect {...accessible('property')} value={values.property} onChange={(value) => update('property', value)} options={[{ value: '', label: 'Select a property type' }, ...propertyOptions(values.project).map((type) => ({ value: type, label: type }))]} />)}
            {field('budget', 'Budget Range (PKR)', <CustomSelect {...accessible('budget')} value={values.budget} onChange={(value) => update('budget', value)} options={[{ value: '', label: 'Optional budget preference' }, ...budgetOptions.map((budget) => ({ value: budget, label: budget }))]} />, true)}
            {field('requirements', 'Additional Requirements', <textarea {...accessible('requirements')} rows={3} maxLength={2000} placeholder="Tell us about your preferred unit size, floor, bedrooms, or any specific requirements." value={values.requirements} onChange={(event) => update('requirements', event.target.value)} />, true)}
            <div className={styles.full}>
              <label className={styles.consent} htmlFor="quote-consent"><input {...accessible('consent')} type="checkbox" required checked={values.consent} onChange={(event) => update('consent', event.target.checked)} /><span>I agree to include these details in a WhatsApp enquiry to Rahat Associates. I can review the message before sending.</span></label>
              {errors.consent && <p className={styles.error} id="quote-consent-error">{errors.consent}</p>}
            </div>
            <div className={`${styles.actions} ${styles.full}`}>
              <button type="submit">Request Quotation <ArrowRight size={19} /></button>
              <span><MessageCircle size={15} />Your enquiry will be prepared for the Rahat Associates team.</span>
            </div>
            {message && <div className={`${styles.prepared} ${styles.full}`}>
              <p role="status">{whatsappUrl ? 'Your message is prepared. Review and send it in WhatsApp. Nothing has been submitted by this website.' : 'Your message is prepared. The official WhatsApp contact has not been configured; no message has been sent.'}</p>
              {whatsappUrl && <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">Open prepared message in WhatsApp <ArrowRight size={16} /></a>}
              <details><summary>Review your enquiry</summary><pre>{message}</pre></details>
            </div>}
          </form>
        </div>
      </div>
    </section>
  );
}
