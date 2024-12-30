import prisma from '@/lib/prisma';
import { NextRequest } from 'next/server';

export const DELETE = async (req: NextRequest) => {
  const apiKey = req.nextUrl?.searchParams?.get('apiKey');
  const id = req.nextUrl?.searchParams?.get('id');

  if (process.env.API_KEY !== apiKey) {
    prisma.$disconnect();
    return new Response('Unauthorized', { status: 401 });
  }

  if (!id) {
    prisma.$disconnect();
    return new Response('ID is required.', { status: 400 });
  }

  const user = await prisma.user.delete({
    where: {
      id,
    },
  });

  return new Response(JSON.stringify(user), { status: 200 });
};
