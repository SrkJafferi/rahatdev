'use client';

import Image from 'next/image';
import { useState, type FormEvent } from 'react';
import { ArrowRight, Building2, Facebook, Images, Info, Layers3, Linkedin, Mail, MapPin, MessageCircle, Phone, Sparkles, Wrench, Youtube } from 'lucide-react';
import { contact, projects } from '@/data/projects';
import { quotationWhatsAppUrl } from '@/lib/quotation';
import styles from './footer.module.css';

export function Footer() {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState('');
  const [preparedUrl, setPreparedUrl] = useState<string | null>(null);
  const whatsapp = quotationWhatsAppUrl(contact.whatsapp, 'Hello Rahat Associates, I would like to enquire about your developments.');

  function requestUpdates(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const url = quotationWhatsAppUrl(contact.whatsapp, `Hello Rahat Associates, I would like to receive relevant communications.\n\nEmail: ${email.trim()}\nConsent: I agree to receive relevant communications.\n\nPlease let me know how to stay informed. Thank you.`);
    setPreparedUrl(url);
    setStatus(url ? 'Your update request is prepared. Review and send it in WhatsApp; you have not been subscribed by this website.' : 'The official WhatsApp contact is not configured. Nothing has been sent.');
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <footer className={styles.footer} aria-label="Rahat Associates footer">
      <div className={styles.main}>
        <div className={styles.background} aria-hidden="true"><Image src="/media/footer-residence-background.avif" alt="" fill sizes="100vw" /></div>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <a href="#home" aria-label="Rahat Associates home"><Image src="/media/logo.png" alt="Rahat Associates Estate & Builders official logo" width={800} height={300} sizes="260px" /></a>
            <p className={styles.tagline}>Creating Better Spaces.<br /><em>For Life &amp; Business.</em></p>
            <p className={styles.description}>Rahat Associates brings residential and commercial spaces together across Faisal Margalla City, Bahria Enclave and Grand City, Kharian.</p>

            <address className={styles.contactDetails}>
              <a href={`mailto:${contact.email}`}><Mail size={18} strokeWidth={1.4} aria-hidden="true" /><span>{contact.email}</span></a>
              <a href={`tel:${contact.whatsapp.replace(/\s/g, '')}`}><Phone size={18} strokeWidth={1.4} aria-hidden="true" /><span>{contact.whatsapp}</span></a>
              <p><MapPin size={18} strokeWidth={1.4} aria-hidden="true" /><span>First Floor, Rahat Arcade, Block B1 Ext, Block A Multi Gardens B-17, Islamabad, Pakistan</span></p>
            </address>
          </div>
          <nav className={styles.column} aria-label="Footer developments">
            <p className={styles.eyebrow}>Our developments</p>
            {projects.map((project) => <a key={project.id} href="#projects"><span><Building2 size={17} strokeWidth={1.4} aria-hidden="true" />{project.name}</span><ArrowRight size={15} aria-hidden="true" /></a>)}
            <div className={styles.qr}><Image src="/media/qr-code.avif" alt="Rahat Associates supplied QR code" width={140} height={140} sizes="140px" unoptimized /></div>
          </nav>
          <nav className={styles.column} aria-label="Footer navigation">
            <p className={styles.eyebrow}>Explore</p>
            <a href="#story"><span><Info size={17} strokeWidth={1.4} aria-hidden="true" />About us</span><ArrowRight size={15} aria-hidden="true" /></a>
            <a href="#features"><span><Sparkles size={17} strokeWidth={1.4} aria-hidden="true" />What we offer</span><ArrowRight size={15} aria-hidden="true" /></a>
            <a href="#services"><span><Wrench size={17} strokeWidth={1.4} aria-hidden="true" />Our services</span><ArrowRight size={15} aria-hidden="true" /></a>
            <a href="#features"><span><Building2 size={17} strokeWidth={1.4} aria-hidden="true" />Project features</span><ArrowRight size={15} aria-hidden="true" /></a>
            <a href="#floor-plans"><span><Layers3 size={17} strokeWidth={1.4} aria-hidden="true" />Floor plans</span><ArrowRight size={15} aria-hidden="true" /></a>
            <a href="/gallery" aria-disabled="true" title="Gallery page is coming soon" onClick={(event) => event.preventDefault()}><span><Images size={17} strokeWidth={1.4} aria-hidden="true" />Gallery</span><ArrowRight size={15} aria-hidden="true" /></a>
            <a href="#quotation"><span><MessageCircle size={17} strokeWidth={1.4} aria-hidden="true" />Get in touch</span><ArrowRight size={15} aria-hidden="true" /></a>
          </nav>
          <div className={styles.connected}>
            <p className={styles.eyebrow}>Stay connected</p>
            <p className={styles.updateCopy}>Connect with us for the latest news &amp; updates.</p>
            <form onSubmit={requestUpdates}>
              <label className={styles.emailLabel} htmlFor="footer-email">Your email address</label>
              <div className={styles.emailField}><Mail size={18} aria-hidden="true" /><input id="footer-email" type="email" required autoComplete="email" placeholder="Your email address" maxLength={254} value={email} onChange={(event) => { setEmail(event.target.value); setStatus(''); setPreparedUrl(null); }} /><button type="submit" aria-label="Prepare project update request"><ArrowRight size={21} /></button></div>
              <label className={styles.consent}><input type="checkbox" required checked={consent} onChange={(event) => { setConsent(event.target.checked); setStatus(''); setPreparedUrl(null); }} /><span>I agree to receive relevant communications.</span></label>
              {status && <p className={styles.status} role="status">{status} {preparedUrl && <a href={preparedUrl} target="_blank" rel="noopener noreferrer">Open prepared request</a>}</p>}
            </form>
            <div className={styles.socials}>
              <a href={contact.facebook} target="_blank" rel="noopener noreferrer" aria-label="Rahat Associates on Facebook"><Facebook size={19} /></a>
              {whatsapp && <a href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Contact Rahat Associates on WhatsApp"><MessageCircle size={20} /></a>}
              <a href="https://www.youtube.com/@RahatAssociates" target="_blank" rel="noopener noreferrer" aria-label="Rahat Associates on YouTube"><Youtube size={20} /></a>
              <a href="#" aria-label="Rahat Associates on LinkedIn"><Linkedin size={19} /></a>
            </div>
          </div>
        </div>
        <p className={styles.copyright}>© 2026 Rahat Associates. All rights reserved.</p>
      </div>
    </footer>
  );
}
