import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';

export const GET = async () => {
  const session = await getSession();

  if (!session) {
    return new Response(JSON.stringify({ success: false, error: 'Not authenticated' }), {
      status: 401,
    });
  }

  try {
    const items = await prisma.post.findMany({
      include: {
        rate: true,
      },
    });

    return new Response(JSON.stringify({ success: true, items }), {
      status: 200,
    });
  } catch (error) {
    console.error('GET request failed', (error as Error).message);

    return new Response(JSON.stringify({ success: false, error: (error as Error).message }), {});
  }
};
