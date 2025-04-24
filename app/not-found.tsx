import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ReactComponent as TheWallComputer } from '@/public/the-wall-logo.svg';

export const metadata: Metadata = {
  title: 'Not Found',
};

const NotFoundPage = () => {
  return (
    <main className="flex flex-col flex-1 items-center justify-center min-h-screen mx-auto max-w-screen-2xl px-4 gap-5">
      <Link href="/">
        <TheWallComputer className="h-[46px] w-[36px] md:h-[70px] md:w-[55px]" />
      </Link>
      <h1 className="text-[22px] md:text-4xl font-bold font-inter">Not Found</h1>
      <p className="text-[18px] md:text-xl font-medium font-inter text-center">Sorry, the page you&apos;re looking for does not exist.</p>
    </main>
  );
};

export default NotFoundPage;
