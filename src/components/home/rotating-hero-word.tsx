'use client';

import { useEffect, useState } from 'react';
import styles from './rotating-hero-word.module.css';

const words = ['Business.', 'Investment.', 'Work.'] as const;

export function RotatingHeroWord() {
  const [index, setIndex] = useState(0);
  const [moving, setMoving] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer: ReturnType<typeof setTimeout>;
    let current = 0;
    let cancelled = false;
    const schedule = () => {
      timer = setTimeout(() => {
        if (cancelled || preference.matches) return;
        setMoving(true);
        timer = setTimeout(() => {
          if (cancelled || preference.matches) return;
          current = (current + 1) % words.length;
          setIndex(current);
          setMoving(false);
          schedule();
        }, 600);
      }, 3000);
    };
    const restart = () => {
      clearTimeout(timer);
      current = 0;
      setIndex(0);
      setMoving(false);
      if (!preference.matches) schedule();
    };
    restart();
    preference.addEventListener('change', restart);
    return () => { cancelled = true; clearTimeout(timer); preference.removeEventListener('change', restart); };
  }, []);

  return (
    <span className={`${styles.word} ${moving ? styles.moving : ''}`} aria-hidden="true">
      <span className={styles.measure}>Investment.</span>
      <span className={styles.current} style={{ color: index === 1 ? '#0067CF' : '#509F38' }}>{words[index]}</span>
      <span className={styles.incoming} style={{ color: (index + 1) % words.length === 1 ? '#0067CF' : '#509F38' }}>{words[(index + 1) % words.length]}</span>
    </span>
  );
}
