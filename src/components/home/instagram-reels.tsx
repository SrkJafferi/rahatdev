'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Instagram, Pause, Play } from 'lucide-react';
import { instagramReels, instagramReelsUrl, type InstagramReel } from '@/data/instagram-reels';
import { Modal } from '@/components/site/dialogs';
import styles from './instagram-reels.module.css';

export function curateReels(items: InstagramReel[]) {
  const seen = new Set<string>();
  return [...items].sort((a, b) => a.order - b.order).filter(item => {
    if (seen.has(item.id) || seen.has(item.instagramUrl)) return false;
    seen.add(item.id); seen.add(item.instagramUrl); return true;
  }).slice(0, 12);
}

export function InstagramReels({ items = instagramReels }: { items?: InstagramReel[] }) {
  const reels = curateReels(items);
  return reels.length ? <ReelsCarousel reels={reels} /> : null;
}

function ReelsCarousel({ reels }: { reels: InstagramReel[] }) {
  const track = useRef<HTMLDivElement>(null);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [paused, setPaused] = useState(false);
  const [opened, setOpened] = useState<InstagramReel | null>(null);

  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(preference.matches);
    const visibility = () => setHidden(document.hidden);
    update(); visibility();
    preference.addEventListener('change', update);
    document.addEventListener('visibilitychange', visibility);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting && entry.intersectionRatio >= 0.35), { threshold: [0, 0.35] });
    if (track.current) observer.observe(track.current);
    return () => { observer.disconnect(); preference.removeEventListener('change', update); document.removeEventListener('visibilitychange', visibility); };
  }, []);

  useEffect(() => {
    const elements = videos.current;
    elements.forEach((video, index) => {
      if (!video) return;
      if (index === active && visible && !hidden && !reduced && !paused && !opened) {
        video.muted = true;
        void video.play().catch(() => { /* Visitor can open the controlled player if autoplay is blocked. */ });
      } else { video.pause(); video.muted = true; }
    });
    return () => { elements.forEach(video => video?.pause()); };
  }, [active, visible, hidden, reduced, paused, opened]);

  function move(direction: number) {
    const el = track.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = (card?.offsetWidth ?? 300) + 22;
    const max = el.scrollWidth - el.clientWidth;
    let left = el.scrollLeft + direction * step;
    if (direction > 0 && el.scrollLeft >= max - 3) left = 0;
    if (direction < 0 && el.scrollLeft <= 3) left = max;
    el.scrollTo({ left, behavior: reduced ? 'instant' : 'smooth' });
  }

  useEffect(() => {
    if (!visible || hidden || reduced || hovered || focused || stopped || opened || reels.length < 2) return;
    const timer = window.setInterval(() => {
      const el = track.current;
      const card = el?.firstElementChild as HTMLElement | null;
      if (!el || !card) return;
      el.scrollTo({ left: el.scrollLeft >= el.scrollWidth - el.clientWidth - 3 ? 0 : el.scrollLeft + card.offsetWidth + 22, behavior: 'smooth' });
    }, 4000);
    return () => window.clearInterval(timer);
  }, [visible, hidden, reduced, hovered, focused, stopped, opened, reels.length]);

  return (
    <section id="instagram-reels" className={styles.section} aria-labelledby="reels-title">
      <div className={styles.wrap}>
        <div className={styles.head}><div><p className={styles.kicker}>Follow our journey</p><h2 id="reels-title">See Our Developments<br /><em>in Motion.</em></h2><p className={styles.intro}>Explore project highlights, property walkthroughs and the latest moments from Rahat Associates.</p></div><a className="text-link" href={instagramReelsUrl} target="_blank" rel="noopener noreferrer">View All Reels <ArrowUpRight size={18} /></a></div>
        <div className={styles.carousel} role="region" aria-roledescription="carousel" aria-label="Rahat Associates Instagram reels" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
          <div ref={track} className={styles.track} tabIndex={0} aria-label="Reels. Swipe or use left and right arrow keys." onPointerDown={() => setStopped(true)} onKeyDown={event => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); setStopped(true); move(event.key === 'ArrowRight' ? 1 : -1); } }} onScroll={() => {
            const el = track.current; const card = el?.firstElementChild as HTMLElement | null;
            if (el && card) setActive(Math.round(el.scrollLeft / (card.offsetWidth + 22)));
          }}>
            {reels.map((reel, index) => <article key={reel.id} className={styles.card} aria-label={reel.title}>
              {reel.posterSrc && <Image src={reel.posterSrc} alt="Original cover from the Rahat Associates Instagram reel" fill sizes="(max-width: 599px) 76vw, (max-width: 899px) 42vw, 25vw" className={styles.poster} />}
              {reel.videoSrc && <video ref={el => { videos.current[index] = el; }} className={styles.video} src={visible && Math.abs(active - index) <= 1 ? reel.videoSrc : undefined} poster={reel.posterSrc} preload={visible && Math.abs(active - index) <= 1 ? 'metadata' : 'none'} muted playsInline loop />}
              {reel.videoSrc ? <button className={styles.open} onClick={() => { setStopped(true); setOpened(reel); }} aria-label={`Open video player: ${reel.title}`} /> : <a className={styles.open} href={reel.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label={`Watch ${reel.title} on Instagram (opens in a new tab)`} />}
              <span className={styles.instagram} aria-hidden="true"><Instagram size={20} /></span>
              <div className={styles.caption}><small>@rahatassociates</small><h3>{reel.title}</h3><span>{reel.videoSrc ? 'Open video player' : 'Watch on Instagram'} <ArrowUpRight size={16} /></span></div>
              {reel.videoSrc && active === index && <button className={styles.playback} onClick={() => { setStopped(true); setPaused(!paused); }} aria-label={paused ? 'Play reel preview' : 'Pause reel preview'}>{paused ? <Play size={17} /> : <Pause size={17} />}</button>}
            </article>)}
          </div>
          <div className={styles.controls}><p>Stories from our team.<span> {reels.some(r => r.videoSrc) ? 'Explore the latest reels.' : 'Open a reel to watch on Instagram.'}</span></p><div><button onClick={() => { setStopped(!stopped); }} aria-label={stopped ? 'Resume automatic carousel' : 'Pause automatic carousel'} aria-pressed={stopped}>{stopped ? <Play size={17} /> : <Pause size={17} />}</button><button onClick={() => { setStopped(true); move(-1); }} aria-label="Previous reel"><ArrowLeft size={19} /></button><button onClick={() => { setStopped(true); move(1); }} aria-label="Next reel"><ArrowRight size={19} /></button></div></div>
        </div>
      </div>
      <Modal open={!!opened} close={() => setOpened(null)} label={opened?.title ?? 'Reel player'} className={styles.modal}>
        {opened && <><video key={opened.id} src={opened.videoSrc} poster={opened.posterSrc} controls muted playsInline autoPlay className={styles.player} /><a href={opened.instagramUrl} target="_blank" rel="noopener noreferrer">View original reel on Instagram <ArrowUpRight size={16} /></a></>}
      </Modal>
    </section>
  );
}
