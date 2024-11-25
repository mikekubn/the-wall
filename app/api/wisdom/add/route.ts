import { turnstileValidate } from '@/lib/turnstile';
import prisma from '@/lib/prisma';

export const POST = async (req: Request) => {
  const request = await req.json();

  try {
    const response = await turnstileValidate(request['cf-turnstile']);
    const validation = await response.json();

    if (validation.success) {
      const { role, message } = request;

      try {
        const item = await prisma.post.create({
          data: {
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            role,
            message,
            status: 'PENDING',
            rate: {
              create: {
                up: 0,
                down: 0,
              },
            },
          },
        });

        return new Response(JSON.stringify({ success: true, item }), {
          status: 200,
        });
      } catch (error) {
        prisma.$disconnect();

        return new Response(JSON.stringify({ success: false, error: (error as Error).message }), {
          status: 400,
        });
      }
    } else {
      prisma.$disconnect();

      return new Response(JSON.stringify({ success: false, error: validation.error }), {
        status: 403,
      });
    }
  } catch (error) {
    prisma.$disconnect();

    return new Response(JSON.stringify({ success: false, error: (error as Error).message }), {
      status: 400,
    });
  }
};
