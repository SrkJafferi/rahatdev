import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Header } from '@/components/site/header';
import { Footer } from '@/components/site/footer';
import { FloatingContact } from '@/components/site/floating-contact';
import { ContactPortfolio } from '@/components/contact/contact-portfolio';
import styles from '@/components/contact/contact-portfolio.module.css';
export const metadata: Metadata = { title: 'Contact Rahat Associates | Estate & Builders', description: 'Contact Rahat Associates for residential and commercial project enquiries, property availability, floor plans and consultation in Islamabad and Kharian.', alternates: { canonical: '/contact' } };
export default function ContactPage() {
  return <div className={styles.page}><a href="#main" className="skip-link">Skip to content</a><Header internalPage /><Suspense fallback={<main className={styles.loading}>Loading contact details…</main>}><ContactPortfolio /></Suspense><Footer internalPage /><FloatingContact /></div>;
}
