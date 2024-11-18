import { Button } from '@/components/ui/button';
import DarkLogo from '@/public/logo/dark_logo.svg';
import Link from 'next/link';

const HomePage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <section className="flex flex-row items-center gap-4">
        <DarkLogo className="size-12" />
        <h1 className="text-4xl font-bold">Hello, world!</h1>
      </section>
      <div className="h-10" />
      <Button asChild variant="default">
        <Link title="the12st" href="https://www.the12st.com/" target="_blank">
          the12st
        </Link>
      </Button>
    </main>
  );
};

export default HomePage;
