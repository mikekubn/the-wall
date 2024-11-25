'use client';

import { signOut, useSession } from 'next-auth/react';

const DashboardInfo = () => {
  const { data: session } = useSession();

  return (
    <div className="h-10 flex flex-row justify-between items-center mb-8">
      <h1 className="text-4xl">Dashboard</h1>
      <div className="flex flex-row gap-2">
        <p>{session?.user?.email}</p>
        <p>|</p>
        <button onClick={() => signOut({ redirect: true, callbackUrl: '/' })} type="button" className="hover:underline">
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default DashboardInfo;
