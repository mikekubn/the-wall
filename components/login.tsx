'use client';

import { signIn } from 'next-auth/react';
import { FormEvent } from 'react';

const Login = () => {
  const handleCredentials = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    signIn('credentials', {
      redirect: true,
      callbackUrl: '/dashboard',
      email,
      password,
    });
  };

  return (
    <form className="flex flex-col items-center justify-center gap-5" onSubmit={handleCredentials}>
      <label htmlFor="credentials-email" className="flex flex-col font-bold text-[14px] text-gray">
        Email
        <input
          id="credentials-email"
          name="email"
          type="email"
          placeholder="E-mail"
          className="font-normal text-[14px] w-[240px] border border-gray px-1.5 py-2 rounded-md"
        />
      </label>
      <label htmlFor="credentials-password" className="flex flex-col font-bold text-[14px] text-gray">
        Password
        <input
          id="credentials-password"
          name="password"
          type="password"
          placeholder="Password"
          className="font-normal text-[14px] w-[240px] border border-gray px-1.5 py-2 rounded-md"
        />
      </label>
      <button
        type="submit"
        className="flex flex-col items-center justify-center md:text-[17px] text-white bg-blue rounded-[12px] w-full py-2 hover:bg-white hover:text-black">
        Sign In
      </button>
    </form>
  );
};

export default Login;
