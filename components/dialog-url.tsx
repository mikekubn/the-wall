/* eslint-disable tailwindcss/no-custom-classname */
'use client';

import { items, PostProps } from '@/type';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Rating from '@/components/rating';
import { Share } from 'lucide-react';
import useShortcut, { KEYS } from '@/hooks/use-shortcut';

const DialogUrl = () => {
  const [post, setPost] = useState<PostProps | null>(null);
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const sort = params.get('sort');
  const id = params.get('id');

  const closeModal = () => {
    setOpen(false);
    document.body.classList.remove('no-scroll');
    router.replace(`/?sort=${sort}`);
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
    if (id) {
      setOpen(true);
      document.body.classList.add('no-scroll');
    } else {
      closeModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (!id) {
      setPost(null);
    }

    if (id) {
      const item = items.find((i) => i.id === id);
      if (item) {
        setPost(item);
      }
    }
  }, [id]);

  if (!id) {
    return null;
  }

  return (
    isOpen && (
      <div className="dialog-backdrop fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={handleOutsideClick}>
        <div
          className="dialog-content bg-white shadow-lg relative flex flex-col w-[380px] h-fit min-h-[30%] md:size-1/2 rounded-[12px] p-4 md:p-12"
          onClick={(e) => e.stopPropagation()}>
          <button className="absolute top-2 right-4 text-black hover:text-blue" onClick={closeModal}>
            ×
          </button>
          {post ? (
            <div className="flex flex-col flex-1 h-full md:size-full items-center justify-between">
              <p className="font-semibold font-inter text-gray_2 text-[16px]">{post.role}:</p>
              <div className="flex flex-col flex-1 items-center justify-center size-full my-4">
                <p className="font-semibold font-inter text-[28px] leading-normal md:text-center">
                  <span className="italic mr-1">&quot;</span>
                  <span>{post.message}</span>
                  <span className="italic ml-1">&quot;</span>
                </p>
              </div>
              <div className="flex flex-row gap-6 items-center">
                <Rating post={post} />
                <Share className="size-[16px] text-gray_1" />
              </div>
            </div>
          ) : (
            <p className="text-[22px] md:text-[28px]">Loading...</p>
          )}
        </div>
      </div>
    )
  );
};

export default DialogUrl;
