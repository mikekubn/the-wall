import React from 'react';
import Providers from '../providers';
import { getSession } from '@/lib/auth';

const AuthLayout: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
  const session = await getSession();

  return (
    <Providers session={session}>
      <main className="flex flex-col flex-1 min-h-screen items-center mx-auto max-w-screen-2xl px-4">{children}</main>
    </Providers>
  );
};

export default AuthLayout;
