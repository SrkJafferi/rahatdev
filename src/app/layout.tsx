import type { Metadata } from 'next';
import { Poppins, Playfair_Display } from 'next/font/google';
import './globals.css';
import 'lenis/dist/lenis.css';
import { SmoothScroll } from '@/components/motion/smooth-scroll';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-body', display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], weight: '600', style: ['normal', 'italic'], variable: '--font-editorial', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || 'http://127.0.0.1:3000'),
  title: 'Rahat Associates — Spaces that inspire. Developments that endure.',
  description:
    'Rahat Associates develops residential and commercial addresses: Rahat Heights in Faisal Margalla City, Smart One Heights 2 in Bahria Enclave, Islamabad, and Rahat Heights II in Grand City, Kharian.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Rahat Associates | Estate & Builders',
    description: 'Three developments. One considered vision.',
    type: 'website',
    images: [{ url: '/media/smart-one-exterior.webp', width: 1139, height: 641 }],
  },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/media/logo.png' },
};

/**
 * Marks the document as motion-capable before first paint so entrance states can be
 * hidden by CSS instead of flashing on hydration. If the app bundle never boots, the
 * class removes itself so every section stays readable without JavaScript.
 */
const motionBootstrap = `(function(){var d=document.documentElement;d.classList.add('has-motion');var t=setTimeout(function(){if(!d.hasAttribute('data-motion-ready'))d.classList.remove('has-motion')},2500);window.addEventListener('load',function(){clearTimeout(t)},{once:true})})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBootstrap }} />
      </head>
      <body className={`${poppins.variable} ${playfair.variable}`}><SmoothScroll />{children}</body>
    </html>
  );
}
