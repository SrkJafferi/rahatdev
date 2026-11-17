'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Lightbox } from '@/components/site/dialogs';
import styles from './page.module.css';

const companyPhotos = [
  ['groundbreaking', 'Groundbreaking'],
  ['inauguration', 'Rahat Heights inaugural ceremony'],
  ['office-team', 'Office and team'],
  ['community', 'Community gathering'],
  ['project-launch', 'Project launch'],
  ['sports', 'Sports and team spirit'],
  ['company-gathering', 'Company gathering'],
  ['office-opening', 'Office opening'],
].map(([id, title]) => ({ id, title, kind: 'Company moments', image: `/media/about-company/${id}.avif` }));

export function CompanyMoments() {
  const [index, setIndex] = useState(-1);

  return (
    <>
      <div className={styles.momentsGrid}>
        {companyPhotos.map(({ id, title, image }, photoIndex) => (
          <button
            className={styles.momentPhoto}
            key={id}
            type="button"
            aria-label={`Enlarge photo: ${title}`}
            aria-haspopup="dialog"
            onClick={() => setIndex(photoIndex)}
          >
            <Image src={image} alt="" fill sizes="(max-width: 599px) 88vw, (max-width: 899px) 44vw, 29vw" />
            <span>{title}</span>
          </button>
        ))}
      </div>
      <Lightbox
        items={companyPhotos}
        index={index}
        onClose={() => setIndex(-1)}
        onMove={(direction) => setIndex((current) => (current + direction + companyPhotos.length) % companyPhotos.length)}
      />
    </>
  );
}
