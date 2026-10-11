import type { Metadata } from 'next';
import { Poppins, Playfair_Display } from 'next/font/google';
import './globals.css';
import 'lenis/dist/lenis.css';
import { SmoothScroll } from '@/components/motion/smooth-scroll';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-body', display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], weight: '600', style: ['normal', 'italic'], variable: '--font-editorial', display: 'swap' });

const siteUrl = new URL(
  process.env.SITE_URL ||
    (process.env.VERCEL_ENV === 'production' && process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'https://rahatassociates.pk'),
);
const siteTitle = 'Rahat Associates | Residential & Commercial Developments';
const siteDescription = 'Explore apartments, shops and offices at Rahat Heights, Smart One Heights 2 and Rahat Heights II in Islamabad and Kharian. Enquire directly with Rahat Associates.';
const socialImage = new URL('/og-image.jpg', siteUrl).href;

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: siteTitle,
  description: siteDescription,
  robots: { index: false, follow: false },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    siteName: 'Rahat Associates',
    locale: 'en_PK',
    url: siteUrl.href,
    type: 'website',
    images: [{ url: socialImage, secureUrl: socialImage, width: 1200, height: 675, type: 'image/jpeg', alt: 'Rahat Associates — Find Your Perfect Space. For Living or Investment.' }],
  },
  twitter: { card: 'summary_large_image', title: siteTitle, description: siteDescription, images: [{ url: socialImage, alt: 'Rahat Associates — Find Your Perfect Space.' }] },
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
