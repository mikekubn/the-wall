import { auth } from '@/lib/auth';

const DashboardPage = async () => {
  const session = await auth();

  if (!session) {
    return (
      <div>
        <h1>Unauthorized</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

export default DashboardPage;
