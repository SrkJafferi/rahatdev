import { AnimatedHeading } from '@/components/motion/animated-heading';
import styles from './intro.module.css';

export function IntroHeading() {
  return (
    <AnimatedHeading className={`${styles.title} heading-pair`} id="intro-title" aria-label="A different perspective on modern living.">
      <span className="heading-serif">A different perspective</span>
      <span className={styles.lastLine}>on <em>modern living.</em></span>
    </AnimatedHeading>
  );
}
