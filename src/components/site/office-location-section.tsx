import { ArrowUpRight, MapPin } from 'lucide-react';
import { Reveal } from '@/components/motion/reveal';
import { officeLocation } from '@/data/office';
import styles from './office-location-section.module.css';

export function OfficeLocationSection({ eyebrow = 'Find us', intro = 'Connect with Rahat Associates in Islamabad to discuss our residential and commercial developments and explore property opportunities.' }: { eyebrow?: string; intro?: string } = {}) {
  return (
    <section className={styles.section} id="office" aria-labelledby="office-title">
      <div className={styles.layout}>
        <div className={styles.details}>
          <Reveal><p className={styles.eyebrow}>{eyebrow}</p></Reveal>
          <Reveal delay={0.06}><h2 id="office-title">Visit Our <em>Office.</em></h2></Reveal>
          <Reveal delay={0.1}><p className={styles.intro}>{intro}</p></Reveal>
          <Reveal delay={0.14}>
            <div className={styles.addressBlock}>
              <MapPin size={27} strokeWidth={1.4} aria-hidden="true" />
              <div><p className={styles.label}>Rahat Associates Office</p><address>{officeLocation.addressLines.map((line) => <span key={line}>{line}</span>)}</address></div>
            </div>
            <a className={styles.directions} href={officeLocation.directionsUrl} target="_blank" rel="noopener noreferrer">Get Directions <ArrowUpRight size={19} aria-hidden="true" /></a>
          </Reveal>
        </div>
        <Reveal delay={0.1} className={styles.mapPanel}>
          <div className={styles.mapHeader}><span><span className={styles.dot} />Islamabad, Pakistan</span><span>Our office location</span></div>
          <div className={styles.mapSurface} data-lenis-prevent>
            <iframe src={officeLocation.embedUrl} title="Google Maps: Rahat Associates office address, Rahat Arcade, B-17, Islamabad" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
          </div>
          <p className={styles.mapNote}>Map based on our address. Google Maps may show the building or surrounding area.</p>
        </Reveal>
      </div>
    </section>
  );
}
