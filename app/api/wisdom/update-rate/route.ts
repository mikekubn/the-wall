import prisma from '@/lib/prisma';
import { PostProps } from '@/type';
import { revalidateTag } from 'next/cache';

export const PATCH = async (req: Request) => {
  const { id, up, down } = await req.json();

  try {
    const post: PostProps | null = await prisma.post.findUnique({ where: { id }, include: { rate: true } });
    const rate: PostProps['rate'] = await prisma.rate.update({
      where: { id: post?.rateId as string },
      data: {
        ...(up && { up: Number(post?.rate?.up) + 1 }),
        ...(down && { down: Number(post?.rate?.down) - 1 }),
      },
    });

    revalidateTag('posts');

    return new Response(JSON.stringify({ success: true, rate }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: 'Invalid request.' }), {
      status: 500,
    });
  }
};
