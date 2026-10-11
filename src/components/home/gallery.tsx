'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gallery } from '@/data/projects';
import { Lightbox } from '@/components/site/dialogs';

const images = gallery.filter((item) => item.kind === 'Architectural render');

export function Gallery() {
  const [index, setIndex] = useState(-1);
  return (
    <section id="gallery" className="gallery section" aria-labelledby="gallery-title">
      <div className="wrap">
        <div className="gallery-head">
          <div><p className="eyebrow">Gallery</p><h2 className="display heading-pair" id="gallery-title">Our developments.<br /><em className="heading-accent">A closer perspective.</em></h2></div>
          <p>Explore architectural renders from the Rahat Associates project brochures.</p>
        </div>
        <div className="gallery-grid">
          {images.map((item, imageIndex) => (
            <button key={item.id} className="tile" onClick={() => setIndex(imageIndex)} aria-label={`Enlarge ${item.title} architectural render`}>
              <span className="tile-ratio" />
              <span className="tile-media"><Image src={item.image} alt={`${item.title} architectural render`} fill sizes="(max-width: 899px) 100vw, 55vw" /></span>
              <span className="tile-shade" />
              <span className="tile-label"><span className="tile-label-text"><strong>{item.title}</strong><small>{item.kind}</small></span><span className="tile-arrow"><ArrowUpRight size={18} /></span></span>
            </button>
          ))}
        </div>
      </div>
      <Lightbox items={images} index={index} onClose={() => setIndex(-1)} onMove={(direction) => setIndex((current) => (current + direction + images.length) % images.length)} />
    </section>
  );
}
