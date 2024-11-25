import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { PostProps } from '@/type';

export const PATCH = async (req: Request) => {
  const session = await getSession();

  if (!session) {
    return new Response(JSON.stringify({ success: false, error: 'Not authenticated' }), {
      status: 401,
    });
  }

  const request = await req.json();
  const { id, status, role, message } = request;

  if (!id) {
    prisma.$disconnect();

    return new Response(JSON.stringify({ success: false, message: 'Invalid request' }), { status: 400 });
  }

  try {
    if (role && message) {
      const item = await prisma.post.update({
        where: {
          id: id as string,
        },
        data: {
          role: role as PostProps['role'],
          message: message as PostProps['message'],
        },
      });

      return new Response(JSON.stringify({ success: true, message: 'Post updated', item }), { status: 200 });
    } else {
      const item = await prisma.post.update({
        where: {
          id: id as string,
        },
        data: {
          status: status as PostProps['status'],
        },
      });

      return new Response(JSON.stringify({ success: true, message: 'Post updated', item }), { status: 200 });
    }
  } catch (error) {
    prisma.$disconnect();

    return new Response(JSON.stringify({ success: false, message: 'Error updating post' }), { status: 500 });
  }
};
