'use client';

import { SortProps } from '@/type';
import clsx from 'clsx';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Template = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sort = searchParams.get('sort') as SortProps;

  useEffect(() => {
    if (!['new', 'like', 'old'].includes(sort)) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('sort', 'new');
      router.replace('?' + params.toString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="flex flex-col w-full">
      <div className="flex flex-row justify-start gap-4 flex-1 text-gray mb-10">
        <Link
          href={{ query: 'sort=new' }}
          className={clsx({
            'text-blue': sort === 'new',
          })}>
          Latest
        </Link>
        |
        <Link
          href={{ query: 'sort=like' }}
          className={clsx({
            'text-blue': sort === 'like',
          })}>
          Most popular
        </Link>
        |
        <Link
          href={{ query: 'sort=old' }}
          className={clsx({
            'text-blue': sort === 'old',
          })}>
          Oldest
        </Link>
      </div>
      {children}
    </section>
  );
};

export default Template;
