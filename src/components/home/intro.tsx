import Image from 'next/image';
import { ArrowRight, Rocket } from 'lucide-react';
import { Parallax, Reveal } from '@/components/motion/reveal';
import styles from './intro.module.css';
import { IntroHeading } from './intro-heading';

function MissionIcon() {
  return <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="2" />
    <circle cx="32" cy="32" r="16" stroke="var(--navy)" strokeWidth="2" />
    <circle cx="32" cy="32" r="7" fill="currentColor" fillOpacity=".14" stroke="currentColor" strokeWidth="2" />
    <path d="M32 3v20m0 18v20M3 32h20m18 0h20" stroke="currentColor" strokeWidth="2.5" />
    <circle cx="32" cy="32" r="3" fill="currentColor" />
  </svg>;
}

function VisionIcon() {
  return <Rocket strokeWidth={1.4} aria-hidden="true" />;
}

export function Intro() {
  return (
    <section className={styles.section} id="story" aria-labelledby="intro-title">
      <div className={styles.layout}>
        <div className={styles.editorial}>
          <Reveal><p className={styles.kicker}>The Rahat perspective</p></Reveal>
          <IntroHeading />
          <div className={styles.copy}>
            <Reveal delay={0.12}><p>Rahat Associates brings apartments, shops and offices together through a portfolio of residential and commercial addresses. Our perspective is rooted in the everyday: a place to live, a place to work, and the connection between the two.</p></Reveal>
            <Reveal delay={0.16}><p>The portfolio spans Rahat Heights in Faisal Margalla City (FMC), Smart One Heights 2 in Bahria Enclave, Islamabad, and Rahat Heights II in Grand City, Kharian — distinct locations connected by a shared mixed-use outlook.</p></Reveal>
          </div>
          <Reveal delay={0.2}>
            <div className={styles.values}>
              <article className={`${styles.value} ${styles.mission}`}>
                <span className={styles.icon}><MissionIcon /></span>
                <div><h3>Our Mission</h3><p>To create thriving, well-planned communities that add lasting value to people’s lives. To bring practical design and everyday comfort together in every space.</p></div>
              </article>
              <article className={`${styles.value} ${styles.vision}`}>
                <span className={styles.icon}><VisionIcon /></span>
                <div><h3>Our Vision</h3><p>To be a trusted name in real estate development, known for quality, innovation and community growth. To shape places where living and working can flourish together.</p></div>
              </article>
            </div>
          </Reveal>
          <Reveal delay={0.24}>
            <div className={styles.bottom}>
              <a className={styles.cta} href="#services">See what we offer <ArrowRight size={19} aria-hidden="true" /></a>
              <p className={styles.signature}><span>Rahat</span><small>Associates · Estate &amp; Builders</small></p>
            </div>
          </Reveal>
        </div>
        <div className={styles.visual}>
          <div className={styles.orbits} aria-hidden="true" />
          <span className={styles.watermark} aria-hidden="true">RA</span>
          <Reveal variant="mask" className={styles.imageReveal}>
            <div className={styles.mainImage}>
              <Image src="/media/rahat-heights-ii-exterior.webp" alt="Architectural render of Rahat Heights II, Grand City, Kharian" fill sizes="(max-width: 899px) 88vw, 41vw" quality={90} />
            </div>
          </Reveal>
          <Reveal delay={0.28} className={styles.badge}><p>Rahat Heights II</p><span>Grand City,<br />Kharian</span></Reveal>
          <Parallax className={styles.detail} strength={5}>
            <div className={styles.detailImage}>
              <Image src="/media/rahat-heights-detail.webp" alt="Rahat Heights shops and apartments elevation in Faisal Margalla City (FMC)" fill sizes="(max-width: 599px) 64vw, (max-width: 899px) 46vw, 22vw" quality={90} />
            </div>
            <p className={styles.detailCaption}>Rahat Heights <span>·</span> FMC</p>
          </Parallax>
        </div>
      </div>
    </section>
  );
}
