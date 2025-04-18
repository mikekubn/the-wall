'use client';

import CopiedButton from '@/components/copied';
import Rating from '@/components/rating';
import { formateDate } from '@/lib/utils';
import { PostProps } from '@/type';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const searchParams = useSearchParams();
  const date = formateDate(post?.createdAt);

  const params = new URLSearchParams(searchParams.toString());
  const sort = params.get('sort');

  return (
    <div className="relative group h-[220px] w-[90%] md:w-[406px] md:h-[251px] hover:drop-shadow-lg">
      <Link
        title={post?.role}
        scroll
        prefetch
        href={`/post/${post?.id}?sort=${sort}`}
        className="size-full relative flex flex-col p-4 md:p-12 rounded-[12px] bg-white group-hover:bg-blue border border-gray_5">
        <p className="font-semibold font-inter text-gray_2 text-[14px] md:text-[16px] group-hover:text-white">{post?.role}:</p>
        <p className="min-h-[68px] md:min-h-[58px] font-semibold font-inter text-[18px] md:text-[28px] my-3 leading-tight md:leading-none line-clamp-2 group-hover:text-white">
          <span className="italic mr-1">&quot;</span>
          <span>{post.message}</span>
          <span className="italic ml-1">&quot;</span>
        </p>
        <p className="font-semibold font-inter text-gray_3 text-[14px] md:text-[16px] group-hover:text-white">{date}</p>
      </Link>
      <div className="absolute bottom-4  md:bottom-12 right-1 size-fit pr-4 md:pr-12 group-hover:bg-blue">
        <div className="flex flex-row gap-4 items-center justify-end">
          <Rating post={post} />
          <CopiedButton id={post?.id} />
        </div>
      </div>
    </div>
  );
};

export default Post;
