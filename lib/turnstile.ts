import { getIp } from '@/lib/getIp';

const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export const turnstileValidate = async (token: string) => {
  const ip = await getIp();
  const idempotencyKey = crypto.randomUUID();

  const formData = new FormData();
  formData.append('secret', process.env.NEXT_PRIVATE_TURNSTILE_SECRET_KEY as string);
  formData.append('response', token);
  formData.append('remoteip', ip);
  formData.append('idempotencyKey', idempotencyKey);

  try {
    const firstResult = await fetch(url, {
      body: formData,
      method: 'POST',
    });

    const firstOutcome = await firstResult.json();

    if (firstOutcome.success) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ success: false, error: firstOutcome['error-codes'] }), {
        status: 403,
      });
    }
  } catch (e) {
    return new Response(JSON.stringify({ success: false, error: (e as Error).message }), {
      status: 400,
    });
  }
};
