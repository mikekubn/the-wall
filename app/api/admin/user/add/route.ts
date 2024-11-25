import { hashPassword } from '@/lib/hashPassword';
import prisma from '@/lib/prisma';

export const POST = async (req: Request) => {
  const request = await req.json();
  const { email, password, role, apiKey } = request;

  if (process.env.API_KEY !== apiKey) {
    prisma.$disconnect();
    return new Response('Unauthorized', { status: 401 });
  }

  if (!email || !password) {
    prisma.$disconnect();
    return new Response('Email and password are required.', { status: 400 });
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      role,
      password: hashedPassword,
    },
  });

  return new Response(JSON.stringify(user), { status: 201 });
};
