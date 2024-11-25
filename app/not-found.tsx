import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Not Found',
};

const NotFoundPage = () => {
  return <h1 className="text-[22px] md:text-4xl font-bold font-inter text-center">404</h1>;
};

export default NotFoundPage;
