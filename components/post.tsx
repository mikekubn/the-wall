'use client';

import ShareButton from '@/components/share-button';
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
    <Link
      href={`/?sort=${sort}&id=${post?.id}`}
      className="relative flex flex-col w-[314px] h-[167px] md:w-[406px] md:h-[251px] p-4 md:p-12 rounded-[12px] bg-white hover:bg-blue border group border-gray_5">
      <p className="font-semibold font-inter text-gray_2 text-[12px] md:text-[16px] group-hover:text-white">{post?.role}:</p>
      <p className="min-h-[54px] md:min-h-[58px] font-semibold font-inter text-[22px] md:text-[28px] my-2.5 leading-none line-clamp-2 group-hover:text-white">
        <span className="italic mr-1">&quot;</span>
        <span>{post.message}</span>
        <span className="italic ml-1">&quot;</span>
      </p>
      <p className="font-semibold font-inter text-gray_3 text-[12px] md:text-[16px] group-hover:text-white">{formattedDate}</p>
      <div className="absolute size-full inset-0 rounded-[12px]">
        <div className="flex flex-1 size-full items-end justify-end rounded-[12px] p-4 md:p-12">
          <div className="flex flex-row gap-4 items-center">
            <Rating post={post} />
            <ShareButton id={post?.id} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Post;
