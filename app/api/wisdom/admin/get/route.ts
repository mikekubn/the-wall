import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { NextRequest } from 'next/server';

export const GET = async (req: NextRequest) => {
  const session = await getSession();

  if (!session) {
    return new Response(JSON.stringify({ success: false, error: 'Not authenticated' }), {
      status: 401,
    });
  }

  const id = req.nextUrl.searchParams.get('id');

  try {
    const item = await prisma.post.findUnique({
      where: {
        id: id as string,
      },
    });

    return new Response(JSON.stringify({ success: true, item }), {
      status: 200,
    });
  } catch (error) {
    console.error('GET request failed', (error as Error).message);

    return new Response(JSON.stringify({ success: false, error: (error as Error).message }), {});
  }
};
