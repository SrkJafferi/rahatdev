'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Phone, Mail, ArrowRight, Building2, MapPin, Facebook, Instagram, MessageCircle } from 'lucide-react';
import { contact } from '@/data/projects';
import { portfolioProjects } from '@/data/project-portfolio';
import { officeLocation } from '@/data/office';
import { normalizePhone, quotationWhatsAppUrl } from '@/lib/quotation';
import { OfficeLocationSection } from '@/components/site/office-location-section';
import { ProjectLeadModal } from '@/components/site/project-lead-modal';
import { Reveal } from '@/components/motion/reveal';
import { ContactEnquiryForm } from './contact-enquiry-form';
import styles from './contact-portfolio.module.css';

function WhatsAppMark() {
  return <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M20.5 11.6a8.6 8.6 0 0 1-12.7 7.5L3 20.5l1.3-4.7A8.6 8.6 0 1 1 20.5 11.6Z" /><path d="M8.2 7.2c.5-.4 1 .2 1.5 1.5.2.5-.7 1.1-.5 1.6.6 1.4 1.8 2.5 3.1 3.1.5.2 1.1-.7 1.6-.5 1.3.5 1.9 1 1.5 1.5-.8 1.3-2.6 1-4.8-.3-2.7-1.6-4-4.8-2.4-6.9Z" /></svg>;
}
export function ContactPortfolio() {
  const params = useSearchParams();
  const initialProject = portfolioProjects.find((p) => p.id === params.get('project'))?.id ?? '';
  const [lead, setLead] = useState(false);
  const whatsapp = quotationWhatsAppUrl(contact.whatsapp, 'Hello Rahat Associates, I would like to discuss your developments and property options.')!;
  const configuredPhone = contact.phone as string | null;
  const telephone = configuredPhone ? normalizePhone(configuredPhone) : null;
  return <main id="main">
    <section className={styles.hero} id="home" aria-labelledby="contact-hero-title">
      <div className={styles.heroArt} aria-hidden="true"><Image src="/media/contact-conversation-map.webp" alt="" fill sizes="100vw" loading="eager" quality={90} /></div>
      <div className={styles.heroInner}><Reveal>
        <p className={styles.eyebrow}>Contact Rahat Associates</p>
        <h1 id="contact-hero-title"><span>Let&apos;s Start the</span><em>Right Conversation.</em></h1>
        <p className={styles.heroDescription}>Connect with our team for project information, property enquiries, consultation or any assistance. We&apos;re here to help you make the right move.</p>
      </Reveal></div>
      <div className={styles.heroContactCards} aria-label="Contact options">
        <a className={styles.callCard} href={telephone ? `tel:${telephone}` : '#contact-form'}><span className={styles.contactIcon}><Phone/></span><span><strong>Call Us</strong><small>{telephone ? 'Speak with our team' : 'Telephone confirmation pending'}</small></span><ArrowRight/></a>
        <a className={styles.chatCard} href={whatsapp} target="_blank" rel="noopener noreferrer"><span className={styles.contactIcon}><WhatsAppMark/></span><span><strong>WhatsApp</strong><small>Speak with our team</small></span><ArrowRight/></a>
        <a className={styles.mailCard} href={`mailto:${contact.email}`}><span className={styles.contactIcon}><Mail/></span><span><strong>Email Us</strong><small>Inbox confirmation pending</small></span><ArrowRight/></a>
        <a className={styles.visitCard} href="#office"><span className={styles.contactIcon}><MapPin/></span><span><strong>Visit Our Office</strong><small>Meet us in Islamabad</small></span><ArrowRight/></a>
      </div><span className={styles.heroCity}>Islamabad<span/></span>
    </section>
    <div className={styles.wrap}>
      <section className={styles.enquiry} id="contact-form"><Reveal className={styles.officeCard}><Image src="/media/contact-office-panel.webp" alt="Rahat Heights II architectural façade render" fill sizes="40vw" /><div><p className={styles.eyebrow}>Let&apos;s connect</p><h2>Start a<br /><em>Conversation.</em></h2><p>Visit our office in Islamabad or get in touch with our team to discuss your requirements, explore our developments and get project guidance.</p><ul><li><MapPin /><span><strong>Office Location</strong><address>{officeLocation.address}</address></span></li><li><Building2 /><span><strong>Our Developments</strong><small>Rahat Heights, Smart One Heights 2, Rahat Heights II</small></span></li><li><MessageCircle /><span><strong>Project Consultation</strong><small>Discuss layouts, property categories and current availability.</small></span></li></ul></div></Reveal><ContactEnquiryForm key={initialProject} initialProject={initialProject} /></section>
    </div>
    <OfficeLocationSection eyebrow="Our location" intro="Visit Rahat Associates in Islamabad to discuss our developments and explore property opportunities." />
    <section className={`${styles.wrap} ${styles.social}`} aria-label="Official social media"><div><p className={styles.eyebrow}>Stay connected</p><h2>Follow the <em>Conversation.</em></h2></div><div><a href={contact.facebook} target="_blank" rel="noopener noreferrer"><Facebook size={22} /><span>Facebook<small>@rahatassociates1</small></span><ArrowRight size={17} /></a><a href={contact.instagram} target="_blank" rel="noopener noreferrer"><Instagram size={23} /><span>Instagram<small>@rahatassociates</small></span><ArrowRight size={17} /></a></div></section>
    <section className={styles.cta}><div className={styles.wrap}><div><p className={styles.eyebrow}>Explore more</p><h2>Your Next Opportunity<br /><em>Starts Here.</em></h2><p>Discover our developments and connect with our team for the information you need.</p></div><div><Link className={styles.primary} href="/projects">Explore Our Projects <ArrowRight size={17} /></Link><button className={styles.outline} onClick={() => setLead(true)}>Request Project Details <ArrowRight size={17} /></button></div></div></section>
    {lead && <ProjectLeadModal initial={portfolioProjects.find((p) => p.id === initialProject) ?? portfolioProjects[0]} close={() => setLead(false)} />}
  </main>;
}
