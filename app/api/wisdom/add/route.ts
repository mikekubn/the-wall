import { turnstileValidate } from '@/lib/turnstile';

export const POST = async (req: Request) => {
  const request = await req.json();

  try {
    const response = await turnstileValidate(request['cf-turnstile']);
    const validation = await response.json();

    if (validation.success) {
      console.log('Data:', validation);
      console.log('Response:', response);

      return new Response(JSON.stringify({ success: true }), {
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
