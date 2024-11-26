import { LayoutProps } from '@/type';
import Link from 'next/link';
import TheWallComputer from '@/public/the-wall-logo.svg';
import AddWisdom from '@/components/add-wisdom';

const PublicLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main className="flex flex-col flex-1 min-h-screen items-center mx-auto max-w-screen-2xl pb-24 px-4">
      <section className="flex flex-col items-center my-7 md:my-9">
        <Link href="/">
          <TheWallComputer className="h-[46px] w-[36px] md:h-[70px] md:w-[55px]" />
        </Link>
        <h1 className="text-[22px] md:text-4xl font-bold font-inter text-center my-3">The Wall of Digital Wisdom</h1>
        <a
          href="https://x.com/WallOfDigital"
          target="_blank"
          rel="noreferrer"
          className="text-gray_1 hover:text-gray text-[12px] md:text-[14px] font-inter font-semibold">
          @WallOfDigital
        </a>
      </section>
      {children}
      <AddWisdom />
    </main>
  );
};

export default PublicLayout;
