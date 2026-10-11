import { Header } from '@/components/site/header';
import { Footer } from '@/components/site/footer';
import { Hero } from '@/components/home/hero';
import { Intro } from '@/components/home/intro';
import { Services } from '@/components/home/services';
import { Showcase } from '@/components/home/showcase';
import { Features } from '@/components/home/features';
import { FloorPlans } from '@/components/home/floor-plans';
import { Quotation } from '@/components/home/quotation';
import { FloatingContact } from '@/components/site/floating-contact';

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Intro />
        <Services />
        <Showcase />
        <Features />
        <FloorPlans />
        <Quotation />
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}
