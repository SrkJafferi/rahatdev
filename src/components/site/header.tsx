'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Facebook, Instagram, Menu, X } from 'lucide-react';
import { contact } from '@/data/projects';

const navigation: [string, string][] = [
  ['Home', '#home'],
  ['About', '#story'],
  ['Projects', '#projects'],
  ['Floor plans', '#floor-plans'],
  ['Our Services', '#services'],
  ['Gallery', '/gallery'],
  ['Contact', '#quotation'],
];

export function Header() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const bar = useRef<HTMLSpanElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const frame = useRef(0);

  useEffect(() => {
    const read = () => {
      frame.current = 0;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${progress})`;
      setStuck(window.scrollY > 68);
    };
    const onScroll = () => {
      if (!frame.current) frame.current = requestAnimationFrame(read);
    };
    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [open]);

  return (
    <header className={`site-header ${stuck ? 'is-stuck' : ''}`}>
      <div className="wrap header-bar">
        <a className="brand" href="#home" aria-label="Rahat Associates — home" onClick={() => setOpen(false)}>
          <Image
            src="/media/logo.png"
            alt="Rahat Associates Estate & Builders"
            width={800}
            height={300}
            sizes="(max-width: 900px) 150px, 200px"
            loading="eager"
          />
        </a>
        <nav id="main-navigation" aria-label="Main navigation" className={`header-nav ${open ? 'is-open' : ''}`}>
          {navigation.map(([label, href]) => (
            <a key={href} href={href} aria-disabled={href === '/gallery' ? true : undefined} title={href === '/gallery' ? 'Gallery page is coming soon' : undefined} onClick={(event) => {
              if (href === '/gallery') event.preventDefault();
              setOpen(false);
            }}>
              {label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <div className="header-socials" aria-label="Social media">
            <a href={contact.facebook} target="_blank" rel="noopener noreferrer" aria-label="Rahat Associates on Facebook"><Facebook size={22} strokeWidth={1.4} /></a>
            <a className="header-instagram" href={contact.instagram} target="_blank" rel="noopener noreferrer" aria-label="Rahat Associates on Instagram"><Instagram size={23} strokeWidth={1.5} /></a>
          </div>
          <a href="#quotation" className="header-cta" onClick={() => setOpen(false)}>
            Project enquiry <ArrowUpRight size={22} />
          </a>
        </div>
        <button
          ref={toggle}
          className="nav-toggle"
          aria-controls="main-navigation"
          aria-expanded={open}
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <span ref={bar} className="header-progress" aria-hidden="true" />
    </header>
  );
}
