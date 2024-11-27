import { formateDate } from '@/lib/utils';
import { PostProps } from '@/type';
import CopiedButton from '@/components/copied';
import Rating from '@/components/rating';
import { CircleX } from 'lucide-react';
import Link from 'next/link';
import { Post } from '@prisma/client';
import prisma from '@/lib/prisma';
import { Metadata } from 'next/types';
import { getPost } from '@/lib/queries';

type Params = Promise<{ id: string }>;

export const revalidate = 60;

export const dynamicParams = true;

export const generateMetadata = async ({ params }: { params: Params }): Promise<Metadata> => {
  const { id } = await params;
  const post: PostProps | null = await getPost(id);

  if (!post) {
    return {
      title: "We haven't found wisdom",
      description: "We haven't found wisdom",
    };
  }

  return {
    title: post.role,
    keywords: [post.role, post.message],
    description: post.message,
    alternates: {
      canonical: `https://thewallofdigitalwisdom.tech/post/${id}`,
    },
  };
};

export const generateStaticParams = async () => {
  const posts: Post[] = await prisma.post.findMany({
    where: {
      status: 'APPROVED',
    },
  });

  return posts.map((post) => ({
    id: post.id,
  }));
};

const PostPage = async ({ params, searchParams }: { params: Params; searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
  const { id } = await params;
  const sort = (await searchParams).sort as string;
  const post: PostProps | null = await getPost(id);

  if (!post) {
    return (
      <div className="relative flex flex-col justify-center items-center bg-gray_6 p-6 md:p-12 drop-shadow-lg rounded-[12px] w-[90%] md:w-2/3 lg:w-3/5 h-[300px] md:h-[360px] mx-auto">
        <p className="font-semibold font-inter text-gray text-[14px] md:text-[16px]">We haven&apos;t found wisdom</p>
      </div>
    );
  }

  const date = formateDate(post?.createdAt);

  return (
    <div className="relative flex flex-col justify-between bg-gray_6 p-6 md:p-12 drop-shadow-lg rounded-[12px] w-[90%] md:w-2/3 lg:w-3/5 h-[300px] md:h-[360px] mx-auto">
      <div className="absolute flex flex-row justify-end inset-0 w-full h-10 rounded-t-[12px] p-2">
        <Link title="Homepage" href={{ pathname: '/', query: { sort } }}>
          <CircleX className="size-[20px] text-gray hover:text-gray_2" />
        </Link>
      </div>
      <p className="font-semibold font-inter text-gray text-[14px] md:text-[16px] text-center">{post?.role}:</p>
      <div className="flex flex-col flex-1 items-center justify-center text-center">
        <p className="font-semibold font-inter text-[18px] md:text-[28px] leading-tight">
          <span className="italic mr-1">&quot;</span>
          <span>{post.message}</span>
          <span className="italic ml-1">&quot;</span>
        </p>
      </div>
      <div className="flex flex-row justify-between">
        <p className="font-semibold font-inter text-gray text-[14px] md:text-[16px]">{date}</p>
        <div className="flex flex-row items-center gap-6">
          <Rating post={post} />
          <CopiedButton id={post?.id} />
        </div>
      </div>
    </div>
  );
};

export default PostPage;
