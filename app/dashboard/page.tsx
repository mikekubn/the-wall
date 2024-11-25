import { DataTableDemo } from '@/components/posts';
import { auth, signOut } from '@/lib/auth';
import Link from 'next/link';

const DashboardPage = async () => {
  const session = await auth();

  if (!session) {
    return (
      <div>
        <Link
          href="/login"
          className="w-[180px] flex flex-col items-center justify-center md:text-[17px] text-white bg-blue rounded-[12px] py-2 hover:bg-white hover:text-black">
          Login
        </Link>
      </div>
    );
  }

  return (
    <section className="flex flex-col size-full max-w-screen-lg">
      <div className="h-10 flex flex-row justify-between items-center mb-8">
        <h1 className="text-4xl">Dashboard</h1>
        <div className="flex flex-row gap-2">
          <p>{session?.user?.email}</p>
          <p>|</p>
          <form
            action={async () => {
              'use server';
              await signOut();
            }}>
            <button type="submit" className="hover:underline">
              Sign Out
            </button>
          </form>
        </div>
      </div>
      <DataTableDemo />
    </section>
  );
};

export default DashboardPage;
