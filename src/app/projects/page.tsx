import type { Metadata } from 'next';
import { Header } from '@/components/site/header';
import { Footer } from '@/components/site/footer';
import { FloatingContact } from '@/components/site/floating-contact';
import { ProjectsPortfolio } from '@/components/projects/projects-portfolio';
import styles from '@/components/projects/projects-portfolio.module.css';

export const metadata: Metadata = {
  title: 'Our Projects | Rahat Associates',
  description: 'Explore Rahat Heights, Smart One Heights 2 and Rahat Heights II, residential and commercial developments presented by Rahat Associates in Islamabad and Kharian.',
  alternates: { canonical: '/projects' },
};

export default function ProjectsPage() {
  return <div className={styles.shell}><a className="skip-link" href="#main">Skip to content</a><Header internalPage /><ProjectsPortfolio /><Footer internalPage /><FloatingContact /></div>;
}

