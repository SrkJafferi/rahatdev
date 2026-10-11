'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { Reveal } from '@/components/motion/reveal';
import { contact, projects, type ProjectId } from '@/data/projects';

export function Cta() {
  const [project, setProject] = useState<ProjectId>(projects[0].id);
  const [interest, setInterest] = useState('A residential apartment');
  const [copied, setCopied] = useState(false);
  const [fallback, setFallback] = useState(false);
  const chosen = projects.find((item) => item.id === project) ?? projects[0];
  const message = `Hello Rahat Associates, I would like to enquire about ${chosen.name} in ${chosen.location}. I am interested in ${interest.toLowerCase()}. Please share the current details, pricing and availability. Thank you.`;

  useEffect(() => {
    const select = (event: Event) => {
      setProject((event as CustomEvent<ProjectId>).detail);
      setCopied(false);
    };
    window.addEventListener('project-enquiry', select);
    return () => window.removeEventListener('project-enquiry', select);
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setFallback(false);
    } catch {
      setFallback(true);
    }
  }

  return (
    <section className="cta" id="contact" aria-labelledby="cta-title">
      <div className="cta-media">
        <Image
          src="/media/rahat-heights-exterior.webp"
          alt="Architectural render of Rahat Heights, Faisal Margalla City"
          fill
          sizes="100vw"
          quality={90}
        />
      </div>
      <div className="cta-shade" aria-hidden="true" />
      <div className="wrap cta-inner">
        <div>
          <Reveal>
            <p className="eyebrow">Start a conversation</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="cta-title heading-pair" id="cta-title">
              <span className="heading-serif">Discover what&rsquo;s next</span>
              <br />
              with <span className="heading-accent">Rahat Associates.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="cta-lede">
              Tell us which development interests you. We will share the current details for Rahat Heights, Smart One
              Heights 2 or Rahat Heights II.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="cta-actions">
              <a className="button light" href="#projects">
                Explore our developments <ArrowUpRight size={17} />
              </a>
              <a className="text-link" href={contact.facebook} target="_blank" rel="noopener noreferrer">
                Contact us on Facebook <ArrowUpRight size={16} />
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="enquiry-panel">
            <label htmlFor="enquiry-project">I&rsquo;m interested in</label>
            <select
              id="enquiry-project"
              value={project}
              onChange={(event) => {
                setProject(event.target.value as ProjectId);
                setCopied(false);
              }}
            >
              {projects.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <label htmlFor="enquiry-interest">I&rsquo;m looking for</label>
            <select
              id="enquiry-interest"
              value={interest}
              onChange={(event) => {
                setInterest(event.target.value);
                setCopied(false);
              }}
            >
              <option>A residential apartment</option>
              <option>A commercial space</option>
              <option>General project information</option>
            </select>
            <button className="button solid" onClick={copy}>
              {copied ? 'Enquiry copied' : 'Copy my enquiry'} {copied ? <Check size={17} /> : <Copy size={17} />}
            </button>
            <p className="enquiry-help" role="status">
              {copied
                ? 'Your message is copied. Open our Facebook page and paste it into your conversation.'
                : 'Copy a prepared message, then send it through our official Facebook page. Nothing is sent from this website.'}
            </p>
            {fallback && (
              <label className="copy-fallback">
                Copy this message manually
                <textarea readOnly value={message} onFocus={(event) => event.target.select()} />
              </label>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
