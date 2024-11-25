'use client';

import { signOut, useSession } from 'next-auth/react';

const DashboardInfo = () => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col md:flex-row justify-between items-center py-10">
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
