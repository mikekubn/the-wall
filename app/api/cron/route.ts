import type { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export const GET = async (request: NextRequest) => {
  const apiKey = request.nextUrl?.searchParams?.get('apiKey');

  if (process.env.API_KEY !== apiKey) {
    prisma.$disconnect();
    return Response.json({ success: false, status: 401 });
  }

  const post = await prisma.post.findFirst();
  await prisma.$disconnect();

  return Response.json({ success: true, status: 200, post });
};
