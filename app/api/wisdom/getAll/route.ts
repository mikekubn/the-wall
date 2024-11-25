import prisma from '@/lib/prisma';

export const GET = async () => {
  try {
    const items = await prisma.post.findMany({
      where: {
        status: 'APPROVED',
      },
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
