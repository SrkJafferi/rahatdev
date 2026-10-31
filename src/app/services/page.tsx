import type { Metadata } from 'next';
import { Header } from '@/components/site/header';
import { Footer } from '@/components/site/footer';
import { FloatingContact } from '@/components/site/floating-contact';
import { ServicesPortfolio } from '@/components/services/services-portfolio';
import styles from '@/components/services/services-portfolio.module.css';
export const metadata: Metadata = { title: 'Our Services | Rahat Associates', description: 'Explore residential developments, commercial spaces, property sales and project consultation services offered by Rahat Associates across Islamabad and Kharian.', alternates: { canonical: '/services' } };
export default function ServicesPage() {
  return <div className={styles.page}><a href="#main" className="skip-link">Skip to content</a><Header internalPage /><ServicesPortfolio /><Footer internalPage /><FloatingContact /></div>;
}
