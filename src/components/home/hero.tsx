'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Building2, Handshake, MapPin } from 'lucide-react';
import { EASE, gsap, markMotionReady, refreshAfterAssets, registerMotion } from '@/components/motion/motion';
import { RotatingHeroWord } from './rotating-hero-word';

registerMotion();


/**
 * The supplied architectural background with drifting cloud layers and an
 * oversized marquee in front of the image.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      markMotionReady();
      const stopRefresh = refreshAfterAssets();
      const q = gsap.utils.selector(el);
      const mm = gsap.matchMedia();

      // The header lives outside this component, so it is addressed through the DOM
      // directly: scoped selectors cannot reach it.
      const headerItems = Array.from(document.querySelectorAll('.header-bar > *'));

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // The CSS entrance guard holds the art and copy hidden until this branch runs,
        // so the stage never flashes half-built.
        gsap.set(q('.hero-cloud-left .hero-cloud-img'), { opacity: 0, x: -84 });
        gsap.set(q('.hero-cloud-right .hero-cloud-img'), { opacity: 0, x: 64 });
        gsap.set(q('.hero-marquee-track'), { opacity: 0 });
        gsap.set([q('.hero-eyebrow'), q('.hero-lede'), q('.hero-actions')], { opacity: 0, x: -34 });
        // The line masks are held at opacity 0 by CSS until now, so the headline cannot
        // flash before the type slides up out of its mask.
        gsap.set(q('.hero-title .line'), { opacity: 1 });

        const tl = gsap.timeline({ defaults: { ease: EASE }, delay: 0.1 });
        tl.to(headerItems, { opacity: 1, duration: 0.7, stagger: 0.07 }, 0)
          .fromTo(q('.hero-sky'), { scale: 1.03 }, { scale: 1, duration: 1.9 }, 0)
          .to(q('.hero-cloud-img'), { opacity: 1, x: 0, duration: 1.6, stagger: 0.18 }, 0.2)
          .to(q('.hero-marquee-track'), { opacity: 1, duration: 1.1 }, 0.5)
          .to(q('.hero-eyebrow'), { opacity: 1, x: 0, duration: 0.7 }, 0.34)
          .fromTo(
            q('.hero-title .line > span'),
            { yPercent: 112 },
            { yPercent: 0, duration: 1.15, stagger: 0.1, ease: 'power4.out' },
            0.4,
          )
          .to(q('.hero-lede'), { opacity: 1, x: 0, duration: 0.8 }, 0.96)
          .to(q('.hero-actions'), { opacity: 1, x: 0, duration: 0.7 }, 1.08);

        // Cloud wrappers loop independently in CSS; their child images enter here.
        const stage = { trigger: el, start: 'top top', end: 'bottom top', scrub: true } as const;
        gsap.to(q('.hero-inner'), { y: -56, opacity: 0.28, ease: 'none', scrollTrigger: { ...stage } });
      });

      return () => {
        mm.revert();
        stopRefresh();
      };
    },
    { scope: root },
  );

  return (
    <section className="hero" id="home" ref={root} aria-labelledby="hero-title">
      <div className="hero-sky" aria-hidden="true">
        <Image src="/media/hero-mountain-residence.avif" alt="" fill sizes="100vw" loading="eager" fetchPriority="high" />
      </div>

      <div className="hero-cloud hero-cloud-left" aria-hidden="true">
        <Image
          className="hero-cloud-img"
          src="/media/hero-cloud-left.png"
          alt=""
          width={786}
          height={367}
          loading="eager"
          sizes="(min-width: 900px) 56vw, 150vw"
        />
      </div>
      <div className="hero-cloud hero-cloud-right" aria-hidden="true">
        <Image
          className="hero-cloud-img"
          src="/media/hero-cloud-right.png"
          alt=""
          width={577}
          height={322}
          loading="eager"
          sizes="(min-width: 900px) 41vw, 92vw"
        />
      </div>

      <div className="hero-marquee" aria-hidden="true">
        <div className="hero-marquee-track">
          {[0, 1].map((set) => (
            <div className="hero-marquee-set" key={set}>
              {[0, 1, 2].map((item) => (
                <span className="hero-marquee-item" key={item}>
                  Luxury Property ⋅ <em>Apartments</em> ⋅ Residential ⋅
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="wrap hero-inner">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">RAHAT ASSOCIATES | ESTATE &amp; BUILDERS</p>
          <h1 className="hero-title" id="hero-title" aria-label="Find Your Perfect Space. For Living or Business.">
            <span className="line" aria-hidden="true"><span className="heading-serif">Find Your Perfect Space.</span></span>
            <span className="line hero-rotating-line" aria-hidden="true"><span>For Living or <RotatingHeroWord /></span></span>
          </h1>
          <p className="lede hero-lede">
            From residential apartments to commercial shops and offices, explore property opportunities across Rahat Associates developments.
          </p>
          <div className="hero-actions">
            <a className="button round" href="#projects">
              Explore our projects
              <span className="round-icon" aria-hidden="true">
                <ArrowRight size={18} />
              </span>
            </a>
            <a className="hero-overview" href="#story">
              <span aria-hidden="true"><ArrowRight size={18} /></span>
              Discover our story
            </a>
          </div>
          <ul className="hero-highlights" aria-label="Rahat Associates portfolio">
            <li><Building2 size={29} strokeWidth={1.3} /><span>Residential &amp;<br /><small>Commercial</small></span></li>
            <li><MapPin size={29} strokeWidth={1.3} /><span>Project Locations<br /><small>Islamabad &amp; Kharian</small></span></li>
            <li><Handshake size={29} strokeWidth={1.3} /><span>Direct Enquiries<br /><small>With the Developer</small></span></li>
          </ul>
        </div>
      </div>
    </section>
  );
}
