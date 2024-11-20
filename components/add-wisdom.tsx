/* eslint-disable tailwindcss/no-custom-classname */
'use client';

import * as z from 'zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useShortcut, { KEYS } from '@/hooks/use-shortcut';
import Turnstile from 'react-turnstile';

const schema = z.object({
  role: z.string().min(1, { message: 'Required' }),
  message: z.string().min(1, { message: 'Required' }),
});

type FormValues = z.infer<typeof schema>;

const AddWisdom = () => {
  // const turnstile = useTurnstile();
  const [isOpen, setIsOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const closeModal = () => {
    setIsOpen(false);
    document.body.classList.remove('no-scroll');
  };

  const onSubmit = (data: FormValues) => {
    if (!isVerified) return;

    console.log(data);

    setTimeout(() => {
      setValue('role', '');
      setValue('message', '');
      closeModal();
    }, 300);
  };

  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).classList.contains('dialog-backdrop')) {
      closeModal();
    }
  };

  useShortcut(KEYS.ESCAPE, () => {
    closeModal();
  });

  useEffect(() => {
    if (isOpen) {
      setIsOpen(true);
      document.body.classList.add('no-scroll');
    } else {
      closeModal();
    }
  }, [isOpen]);

  return (
    <>
      <section className="size-fit fixed bottom-4 rounded-xl border px-6 py-4 bg-gray_5/50">
        <button
          onClick={() => setIsOpen(true)}
          className="flex flex-col items-center justify-center md:text-[17px] text-white bg-blue rounded-[12px] h-[50px] px-[20px] hover:bg-white hover:text-black">
          + Add wisdom
        </button>
      </section>
      {isOpen && (
        <div className="dialog-backdrop fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={handleOutsideClick}>
          <div
            className="dialog-content bg-white shadow-lg relative w-[380px] h-fit md:max-h-[90%] overflow-y-auto md:w-1/2 rounded-[12px] p-4 md:p-12"
            onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-2 right-4 text-black hover:text-blue" onClick={closeModal}>
              ×
            </button>
            <div className="flex flex-col flex-1 items-center justify-center">
              <p className="text-[28px] md:text-[34px]">🍺</p>
              <h1 className="font-semibold text-[28px] md:text-[34px] mb-5">Add your wisdom</h1>
              <p className="text-gray text-[12px] md:text-[18px] text-center">
                Please note that in order to prevent account handling or similar childish behavior, we will never display any personal data. At the
                same time, we reserve the right not to disclose anything.
              </p>
              <br />
              <p className="text-gray text-[12px] md:text-[18px] text-center mb-5">
                This entire activity is for the amusement of the community of developers, designers, product managers, and others in the field. We do
                not store any personal data, and after reviewing the post, we discard it.
              </p>
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <div className="inline-flex w-[340px] justify-between">
                  <label className="font-bold text-[14px] text-gray">Who said that?</label>
                  <div className="flex flex-col gap-1">
                    <input
                      {...register('role')}
                      id="role"
                      placeholder="Developer"
                      className="text-[14px] w-[220px] border border-gray px-1.5 py-0.5 rounded-md"
                    />
                    <p className="text-[10px] text-rose-600">{errors?.role?.message}</p>
                  </div>
                </div>
                <div className="inline-flex w-[340px] justify-between">
                  <label className="font-bold text-[14px] text-gray">What said?</label>
                  <div className="flex flex-col gap-1">
                    <textarea
                      {...register('message')}
                      id="message"
                      placeholder="Write your wisdom"
                      className="text-[14px] w-[220px] border border-gray px-1.5 py-0.5 rounded-md"
                    />
                    <p className="text-[10px] text-rose-600">{errors?.message?.message}</p>
                  </div>
                </div>
                <Turnstile
                  sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY as string}
                  theme="light"
                  language="en"
                  size="flexible"
                  refreshExpired="auto"
                  onSuccess={(token, preClearanceObtained) => {
                    setIsVerified(true);
                    console.log('Token:', token);
                    console.log('Pre-clearance obtained:', preClearanceObtained);
                  }}
                  onVerify={(token) => {
                    console.log('Token:', token);
                    // fetch('/login', {
                    //   method: 'POST',
                    //   body: JSON.stringify({ token }),
                    // }).then((response) => {
                    //   if (!response.ok) turnstile.reset();
                    // });
                  }}
                />
                <button
                  type="submit"
                  disabled={!isVerified}
                  className="flex flex-col items-center justify-center md:text-[17px] text-white bg-blue rounded-[12px] h-[50px] px-[20px] hover:bg-white hover:text-black hover:border border-black disabled:cursor-not-allowed">
                  Send wisdom
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddWisdom;
