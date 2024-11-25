import Login from '@/components/login';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

const LoginPage = async () => {
  const session = await getSession();

  if (session) {
    redirect('/dashboard');
  }

  return (
    <section className="flex flex-1 flex-col items-center size-full py-10">
      <h1 className="text-base md:text-2xl">The Wall - Admin center</h1>
      <div className="flex flex-1 flex-col justify-center">
        <Login />
      </div>
    </section>
  );
};

export default LoginPage;
