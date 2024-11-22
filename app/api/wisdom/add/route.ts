import { turnstileValidate } from '@/lib/turnstile';
import { PostProps } from '@/type';

export const POST = async (req: Request) => {
  const request = await req.json();

  try {
    const response = await turnstileValidate(request['cf-turnstile']);
    const validation = await response.json();

    if (validation.success) {
      const { role, message } = request;

      const item: PostProps = {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        role,
        message,
        status: 'pending',
        rate: {
          up: 0,
          down: 0,
        },
      };

      return new Response(JSON.stringify({ success: true, item }), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ success: false, error: validation.error }), {
        status: 403,
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: (error as Error).message }), {
      status: 400,
    });
  }
};
