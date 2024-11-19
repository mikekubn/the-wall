import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import TheWallComputer from '@/public/the-wall-logo.svg';
import { Toaster } from '@/components/ui/toaster';

import './globals.css';
import AddWisdom from '@/components/add-wisdom';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: Readonly<RootLayoutProps>) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex flex-col flex-1 min-h-screen items-center mx-auto max-w-screen-2xl pb-24 px-4">
          <section className="flex flex-col items-center gap-4 my-24">
            <TheWallComputer className="h-[46px] w-[36px] md:h-[70px] md:w-[55px]" />
            <h1 className="text-[22px] md:text-4xl font-bold font-inter text-center">The Wall of Digital Wisdom</h1>
          </section>
          {children}
          <AddWisdom />
        </main>
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
