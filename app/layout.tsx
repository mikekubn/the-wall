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
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://thewallofdigitalwisdom.vercel.app',
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
    canonical: 'https://thewallofdigitalwisdom.vercel.app',
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
