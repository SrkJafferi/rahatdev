'use client';

import Image from 'next/image';
import { AnimatedHeading } from '@/components/motion/animated-heading';
import { Fragment, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Building2, House, Store, BriefcaseBusiness, Diamond, Sun, UsersRound, PanelsTopLeft, MessagesSquare, MapPin, DraftingCompass, KeyRound, ClipboardCheck, Landmark } from 'lucide-react';
import {
  DESKTOP_MOTION_QUERY,
  gsap,
  markMotionReady,
  refreshAfterAssets,
  registerMotion,
} from '@/components/motion/motion';
import { Reveal } from '@/components/motion/reveal';
import { ProjectButton } from '@/components/site/dialogs';
import { projects, services, type Project } from '@/data/projects';
import styles from './services.module.css';

registerMotion();

const projectFor = (id: string): Project => projects.find((project) => project.id === id) ?? projects[0];
const icons = {
  home: House, commercial: Store, development: Landmark, enquiry: MessagesSquare, consultation: ClipboardCheck,
  building: Building2, diamond: Diamond, sun: Sun, people: UsersRound, store: Store, office: BriefcaseBusiness,
  layout: PanelsTopLeft, chat: MessagesSquare, location: MapPin, plan: DraftingCompass, key: KeyRound, check: ClipboardCheck,
};

/**
 * A centred heading and a stack of service cards. Every
 * card is sticky, so on scroll each one settles under the last and the next slides up
 * over it — the scroll position alone drives the sequence, in both directions.
 */
export function Services() {
  const root = useRef<HTMLElement>(null);
  const stack = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = stack.current;
      if (!el) return;
      markMotionReady();
      const cards = gsap.utils.toArray<HTMLElement>(el.querySelectorAll('[data-card]'));
      const markers = gsap.utils.toArray<HTMLElement>(el.querySelectorAll('[data-service-marker]'));
      if (cards.length < 2) return;
      const stopRefresh = refreshAfterAssets();
      const mm = gsap.matchMedia();

      mm.add(DESKTOP_MOTION_QUERY, () => {
        cards.forEach((card, index) => {
          const surface = card.querySelector('[data-service-surface]');
          const image = card.querySelector('[data-service-image]');
          const badge = card.querySelector('[data-service-badge]');
          const stickyTop = () => parseFloat(getComputedStyle(card).top);
          // Animate the surface inside the sticky card: layout and scroll measurements
          // stay stable while the incoming card grows into the foreground.
          gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: { trigger: markers[index], start: 'top 94%', end: () => `top ${stickyTop()}px`, scrub: 0.8, invalidateOnRefresh: true },
          })
            .fromTo(surface, { scale: 0.955, y: 24 }, { scale: 1, y: 0 }, 0)
            .fromTo(image, { scale: 1.055 }, { scale: 1 }, 0)
            .fromTo(badge, { y: 16 }, { y: 0 }, 0);

          const next = cards[index + 1];
          if (next) {
            // Only the overlay changes on outgoing cards, so reverse scrolling never
            // makes two timelines compete for the same surface transform.
            gsap.fromTo(card.querySelector('[data-service-shade]'), { opacity: 0 }, {
              opacity: 0.075,
              ease: 'none',
              scrollTrigger: { trigger: markers[index + 1], start: 'top 75%', end: () => `top ${parseFloat(getComputedStyle(next).top)}px`, scrub: 0.8, invalidateOnRefresh: true },
            });
          }
        });
      });

      return () => {
        mm.revert();
        stopRefresh();
      };
    },
    { scope: root },
  );

  return (
    <section className="services" id="services" ref={root} aria-labelledby="services-title">
      <div className="wrap services-head">
        <Reveal>
          <p className="pill">What we offer</p>
        </Reveal>
        <Reveal delay={0.06}>
          <AnimatedHeading className="display services-title heading-pair" id="services-title">
            Our <span className="heading-accent">Services</span>
          </AnimatedHeading>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="services-note">
            Rahat Associates develops its own residential and commercial addresses. From how a building is planned to
            how a space is sold, the work stays in one pair of hands.
          </p>
        </Reveal>
      </div>

      <div className="wrap services-stack" ref={stack}>
        {services.map((service, index) => {
          const project = projectFor(service.projectId);
          const ServiceIcon = icons[service.icon];
          return (
            <Fragment key={service.id}>
            <div data-service-marker aria-hidden="true" />
            <article
              className={styles.card}
              data-card
              aria-labelledby={`service-${service.id}`}
              style={{ '--stack': index } as React.CSSProperties}
            >
              <div className={styles.surface} data-service-surface>
                <div className={styles.text}>
                  <p className={styles.eyebrow}>What we offer</p>
                  <div className={styles.titleRow}>
                    <span className={styles.serviceIcon} aria-hidden="true"><ServiceIcon size={48} strokeWidth={1.4} /><span /></span>
                    <h3 className={styles.title} id={`service-${service.id}`}>{service.title}</h3>
                  </div>
                  <span className={styles.rule} aria-hidden="true" />
                  <p className={styles.copy}>{service.copy}</p>
                  <ul className={styles.features} aria-label={`${service.title} focus areas`}>
                    {service.features.map((feature) => {
                      const FeatureIcon = icons[feature.icon];
                      return <li key={feature.label}><FeatureIcon size={26} strokeWidth={1.4} aria-hidden="true" /><span>{feature.label}</span></li>;
                    })}
                  </ul>
                  <div className={styles.actions}>
                    <ProjectButton project={project} className={styles.primary} label={`${service.action} — view ${project.name}`}>
                      {service.action}<ArrowRight size={20} aria-hidden="true" />
                    </ProjectButton>
                    <a href={project.brochure} target="_blank" rel="noopener noreferrer" className={styles.secondary} aria-label={`Learn more about ${project.name} — open brochure`}>
                      Learn More<ArrowRight size={18} aria-hidden="true" />
                    </a>
                  </div>
                </div>
                <div className={styles.visual}>
                  <div className={styles.frame} aria-hidden="true" />
                  <div className={styles.media}>
                    <Image data-service-image src={service.image} alt={`${service.title} — representative image`} fill sizes="(max-width: 899px) 90vw, 46vw" unoptimized={service.image.endsWith('.avif')} style={{ objectPosition: service.focus }} />
                    <div className={styles.badge} data-service-badge>
                      <span className={styles.badgeIcon} aria-hidden="true"><ServiceIcon size={28} strokeWidth={1.4} /></span>
                      <div><p>{service.captionLabel}</p><span>{service.caption}</span></div>
                    </div>
                  </div>
                </div>
                <div className={styles.shade} data-service-shade aria-hidden="true" />
              </div>
            </article>
            </Fragment>
          );
        })}
      </div>
    </section>
  );
}
