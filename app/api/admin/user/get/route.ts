import { NextRequest } from 'next/server';

export const GET = async (req: NextRequest) => {
  const apiKey = req.nextUrl?.searchParams?.get('apiKey');

  if (process.env.API_KEY !== apiKey) {
    prisma.$disconnect();
    return new Response('Unauthorized', { status: 401 });
  }

  const users = await prisma.user.findMany();

  return new Response(JSON.stringify(users), { status: 200 });
};
