'use client';

import { SortProps } from '@/type';
import clsx from 'clsx';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const SortMenu = () => {
  const searchParams = useSearchParams();
  const sort = searchParams.get('sort') as SortProps;

  return (
    <div className="flex flex-row justify-center gap-4 text-gray mb-10">
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
  );
};

export default SortMenu;
