import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Header } from '@/components/site/header';
import { Footer } from '@/components/site/footer';
import { FloatingContact } from '@/components/site/floating-contact';
import { GalleryPortfolio } from '@/components/gallery/gallery-portfolio';
import styles from '@/components/gallery/gallery-portfolio.module.css';
export const metadata: Metadata = { title: 'Gallery | Rahat Associates', description: 'Explore architectural images, property interiors, unit photo galleries and project videos from Rahat Associates developments in Islamabad and Kharian.', alternates: { canonical: '/gallery' } };
export default function GalleryPage() {
  return <div className={styles.page}><a className="skip-link" href="#main">Skip to content</a><Header internalPage /><Suspense fallback={<main className={styles.loading}>Loading the Rahat collection…</main>}><GalleryPortfolio /></Suspense><Footer internalPage /><FloatingContact /></div>;
}
