import { LayoutProps } from '@/type';
import Link from 'next/link';
import TheWallComputer from '@/public/the-wall-logo.svg';
import AddWisdom from '@/components/add-wisdom';

const PublicLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main className="flex flex-col flex-1 min-h-screen items-center mx-auto max-w-screen-2xl pb-24 px-4">
      <section className="flex flex-col items-center gap-4 my-12 md:my-24">
        <Link href="/">
          <TheWallComputer className="h-[46px] w-[36px] md:h-[70px] md:w-[55px]" />
        </Link>
        <h1 className="text-[22px] md:text-4xl font-bold font-inter text-center">The Wall of Digital Wisdom</h1>
      </section>
      {children}
      <AddWisdom />
    </main>
  );
};

export default PublicLayout;
