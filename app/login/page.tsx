import Login from '@/components/login';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

const LoginPage = async () => {
  const session = await getSession();

  if (session) {
    redirect('/dashboard');
  }

  return <Login />;
};

export default LoginPage;
