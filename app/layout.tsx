import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { LayoutProps } from '@/type';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'The Wall of Digital Wisdom',
  description: 'A wall of digital wisdom for the digital age.',
  keywords: [
    'digital',
    'wisdom',
    'wall',
    'digital age',
    'knowledge hub',
    'technology insights',
    'digital philosophy',
    'digital transformation',
    'tech wisdom',
    'innovation',
    'digital era',
    'information wall',
    'tech evolution',
    'virtual wisdom',
    'digital enlightenment',
    'futuristic wall',
    'wisdom sharing',
    'digitální',
    'moudrost',
    'zeď',
    'digitální věk',
    'centrum znalostí',
    'technologie',
    'digitální filozofie',
    'digitální transformace',
    'technologická moudrost',
    'inovace',
    'digitální éra',
    'informační zeď',
    'technologický vývoj',
    'virtuální moudrost',
    'digitální osvícení',
    'futuristická zeď',
    'sdílení moudrosti',
  ],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://thewallofdigitalwisdom.tech',
    title: 'The Wall of Digital Wisdom',
    description: 'A wall of digital wisdom for the digital age.',
    images: [
      {
        url: 'https://res.cloudinary.com/dctc6iyms/image/upload/v1732123375/og-the-wall_rxdgre.png',
        width: 1200,
        height: 630,
        alt: 'The Wall of Digital Wisdom',
      },
    ],
  },
  alternates: {
    canonical: 'https://thewallofdigitalwisdom.tech',
  },
};

const RootLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
