import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Header } from '@/components/site/header';
import { Footer } from '@/components/site/footer';
import { FloatingContact } from '@/components/site/floating-contact';
import { FloorPlanExplorer } from '@/components/floor-plans/explorer';
import styles from '@/components/floor-plans/explorer.module.css';

export const metadata: Metadata = {
  title: 'Floor Plans | Rahat Associates',
  description: 'Explore architectural floor plans for Rahat Heights, Smart One Heights 2 and Rahat Heights II, featuring residential and commercial layouts across Islamabad and Kharian.',
  alternates: { canonical: '/floor-plans' },
};
export default function FloorPlansPage() {
  return <div className={styles.page}><a href="#main" className="skip-link">Skip to content</a><Header internalPage /><Suspense fallback={<main className={styles.loading}>Loading architectural plans…</main>}><FloorPlanExplorer /></Suspense><Footer internalPage /><FloatingContact /></div>;
}
