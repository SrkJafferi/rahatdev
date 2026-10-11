'use client';

import { useEffect, useState } from 'react';
import { ArrowUp, Mail, Phone } from 'lucide-react';
import { contact } from '@/data/projects';
import { normalizePhone, quotationWhatsAppUrl } from '@/lib/quotation';
import styles from './floating-contact.module.css';

export function FloatingContact() {
  const [showSecondary, setShowSecondary] = useState(false);
  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setShowSecondary(scrollable > 0 && window.scrollY / scrollable >= 0.2);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    schedule();
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
  const phone = normalizePhone(contact.whatsapp);
  const whatsapp = quotationWhatsAppUrl(contact.whatsapp, 'Hello Rahat Associates, I would like to enquire about your developments.');

  return (
    <nav className={styles.bar} aria-label="Quick contact and page navigation">
      <div className={styles.secondary} hidden={!showSecondary}>
      {phone && <a href={`tel:${phone}`} aria-label="Call Rahat Associates" title="Call Rahat Associates"><Phone size={21} strokeWidth={1.7} /></a>}
      <a href={`mailto:${contact.email}`} aria-label="Email Rahat Associates" title="Email Rahat Associates"><Mail size={22} strokeWidth={1.7} /></a>
      <a href="#home" aria-label="Scroll to top" title="Scroll to top"><ArrowUp size={23} strokeWidth={1.7} /></a>
      </div>
      {whatsapp && <a className={styles.whatsapp} href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Chat with Rahat Associates on WhatsApp" title="Chat on WhatsApp">
        <svg viewBox="0 0 24 24" width="29" height="29" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.4 15.4l-.8 3.5a1 1 0 0 0 1.2 1.2l3.6-1A10 10 0 1 0 12 2Z" /></svg>
      </a>}
    </nav>
  );
}
