'use client';

import CopiedButton from '@/components/copied';
import Rating from '@/components/rating';
import { PostProps } from '@/type';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const searchParams = useSearchParams();
  const date = new Date(post?.date);
  const options: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);

  const params = new URLSearchParams(searchParams.toString());
  const sort = params.get('sort');

  return (
    <div className="relative group h-[220px] w-[90%] md:w-[406px] md:h-[251px] ">
      <Link
        href={`/?sort=${sort}&id=${post?.id}`}
        className="size-full relative flex flex-col p-4 md:p-12 rounded-[12px] bg-white group-hover:bg-blue border border-gray_5">
        <p className="font-semibold font-inter text-gray_2 text-[16px] group-hover:text-white">{post?.role}:</p>
        <p className="min-h-[54px] md:min-h-[58px] font-semibold font-inter text-[28px] my-3 leading-none line-clamp-2 group-hover:text-white">
          <span className="italic mr-1">&quot;</span>
          <span>{post.message}</span>
          <span className="italic ml-1">&quot;</span>
        </p>
        <p className="font-semibold font-inter text-gray_3 text-[16px] group-hover:text-white">{formattedDate}</p>
      </Link>
      <div className="absolute bottom-12 right-1 size-fit pr-4 md:pr-12 group-hover:bg-blue">
        <div className="flex flex-row gap-4 items-center justify-end">
          <Rating post={post} />
          <CopiedButton id={post?.id} />
        </div>
      </div>
    </div>
  );
};

export default Post;
