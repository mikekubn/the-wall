import { PostProps } from '@/type';
import { unstable_cache } from 'next/cache';
import prisma from '@/lib/prisma';

export const getPosts = unstable_cache(
  async () => {
    const items: PostProps[] = await prisma.post.findMany({
      where: {
        status: 'APPROVED',
      },
      include: {
        rate: true,
      },
    });

    return items;
  },
  ['posts'],
  { revalidate: 3600, tags: ['posts'] },
);

export const getPost = async (id: string) => {
  const items: PostProps | null = await prisma.post.findUnique({
    where: {
      id,
      status: 'APPROVED',
    },
    include: {
      rate: true,
    },
  });

  return items;
};
