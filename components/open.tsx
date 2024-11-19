'use client';

import { PostProps } from '@/type';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const Open: React.FC<{ id: PostProps['id'] }> = ({ id }) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const sort = params.get('sort');

  return (
    <Link href={`${window.location.origin}/?sort=${sort}&id=${id}`} className="text-[12px] md:text-[16px] text-gray_2">
      Open
    </Link>
  );
};

export default Open;
