import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export const GET = async (req: NextRequest) => {
  const apiKey = req.nextUrl?.searchParams?.get('apiKey');

  if (process.env.API_KEY !== apiKey) {
    prisma.$disconnect();
    return new Response('Unauthorized', { status: 401 });
  }

  const users = await prisma.user.findMany();
  await prisma.$disconnect();

  return new Response(JSON.stringify(users), { status: 200 });
};
