import DashboardInfo from '@/components/dashboard-info';
import PostTable from '@/components/post-table';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

const DashboardPage = async () => {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  return (
    <section className="flex flex-col size-full max-w-screen-lg">
      <div className="fixed top-0 left-0 w-full flex flex-row flex-1 justify-center px-4">
        <div className="w-[1024px]">
          <DashboardInfo />
        </div>
      </div>
      <div className="h-36" />
      <PostTable />
    </section>
  );
};

export default DashboardPage;
