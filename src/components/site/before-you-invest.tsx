import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, FileCheck2, HardHat, MapPin, UsersRound } from 'lucide-react';
import { Reveal } from '@/components/motion/reveal';
import styles from './before-you-invest.module.css';

const questions = [
  { title: <>Developer’s<br />Track Record</>, copy: 'Has the developer delivered previous projects on time?', icon: UsersRound, href: '#projects', label: 'Explore our developments and project information' },
  { title: <>Price &amp; Terms<br />Clarity</>, copy: 'Are the rates, payment plan and terms clearly written with no hidden charges?', icon: FileCheck2, href: '/#quotation', label: 'Ask our team about pricing and payment terms' },
  { title: <>Construction<br />Quality &amp; Delivery</>, copy: 'What is the construction standard and delivery history?', icon: HardHat, href: '/#floor-plans', label: 'Explore project layouts and brochure specifications' },
  { title: <>Location &amp;<br />Future Demand</>, copy: 'Is the location well-connected with strong growth potential?', icon: MapPin, href: '#office', label: 'Visit our office to discuss project locations' },
];

export function BeforeYouInvest() {
  return (
    <section className={styles.section} id="before-you-invest" aria-labelledby="invest-title">
      <div className={styles.main}>
        <Reveal variant="mask" className={styles.visual}>
          <div className={styles.art}><Image src="/media/property-investment-checklist.webp" alt="Property checklist on a terrace overlooking Islamabad: Right Developer, Clear Terms, Quality and Delivery, Strong Location" fill sizes="(max-width: 899px) 100vw, 43vw" quality={90} /></div>
        </Reveal>
        <div className={styles.content}>
          <Reveal><p className={styles.eyebrow}>Before you invest</p></Reveal>
          <Reveal delay={0.05}><h2 id="invest-title">Before You Book a<br /><em>Property</em></h2></Reveal>
          <Reveal delay={0.1}><p className={styles.banner}>Ask These <strong>4 Questions</strong></p><p className={styles.intro}>A smart property decision starts before the payment,<br className={styles.desktopBreak} /> not after it. Keep these key points in mind when choosing a developer.</p></Reveal>
          <div className={styles.cards}>
            {questions.map((question, index) => <Reveal key={question.href} delay={index * 0.06}>
              <Link href={question.href} className={`${styles.card} ${index % 2 ? styles.green : ''}`} aria-label={question.label}>
                <span className={styles.icon}><question.icon size={35} strokeWidth={1.5} aria-hidden="true" /></span>
                <div className={styles.cardCopy}><h3>{question.title}</h3><p>{question.copy}</p><span className={styles.line} aria-hidden="true" /></div>
                <span className={styles.questionMark} aria-hidden="true">?</span><span className={styles.arrow} aria-hidden="true"><ArrowRight size={16} /></span>
              </Link>
            </Reveal>)}
          </div>
        </div>
      </div>
      <div id="quotation">
      <Reveal className={styles.bottom}>
        <svg className={styles.skyline} viewBox="0 0 1400 160" fill="none" preserveAspectRatio="xMaxYMax slice" aria-hidden="true"><g stroke="currentColor" strokeWidth="1"><path d="M300 160v-21h25v21m20 0v-36h23v36m15 0v-51h24v51m12 0v-27h30v27m12 0v-66h23v66m15 0v-45h25v45M810 160V88h25v72m15 0V62h21v98m15 0V98h35v62m20 0V78h20v82m17 0v-40h27v40m18 0V94h30v66m20 0v-36h35v36M1100 153l85-63 85 63zM1185 90v63m-92-3 92-45 92 45M1093 150V44l4-25 4 25v106M1270 150V44l4-25 4 25v106M1325 160V86h25v74m10 0V56h18v104M0 158h1400" /></g></svg>
        <p>Make a well-informed decision with<br /><em>Rahat Associates.</em></p>
        <div className={styles.actions}><a className={styles.primary} href="#projects">Explore Our Projects <ArrowRight size={20} /></a><Link className={styles.secondary} href="/#quotation">Get in Touch <ArrowRight size={20} /></Link></div>
      </Reveal>
      </div>
    </section>
  );
}
