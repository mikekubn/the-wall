import DashboardInfo from '@/components/dashboard-info';
import PostTable from '@/components/post-table';
import { getSession } from '@/lib/auth';
import Link from 'next/link';

const DashboardPage = async () => {
  const session = await getSession();

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
      <DashboardInfo />
      <PostTable />
    </section>
  );
};

export default DashboardPage;
