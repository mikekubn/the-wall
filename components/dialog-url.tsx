/* eslint-disable tailwindcss/no-custom-classname */
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import Rating from '@/components/rating';
import useShortcut, { KEYS } from '@/hooks/use-shortcut';
import { PostProps } from '@/type';
import CopiedButton from '@/components/copied';

const DialogUrl = () => {
  const [post, setPost] = useState<PostProps | null>(null);
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const sort = params.get('sort');
  const id = params.get('id');

  const fetchPost = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/wisdom/get?id=${id}`);
      const data: { success: boolean; item: PostProps } = await response.json();
      setPost(data.item);
    } catch (error) {
      console.error('Failed to fetch post:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const closeModal = () => {
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
      fetchPost();
    }
  }, [fetchPost, id]);

  if (!id) {
    return null;
  }

  return (
    <div className="dialog-backdrop fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={handleOutsideClick}>
      <div
        className="dialog-content bg-white shadow-lg relative flex flex-col w-[380px] h-fit min-h-[30%] md:size-1/2 rounded-[12px] p-4 md:p-12"
        onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-2 right-4 text-black hover:text-blue" onClick={closeModal}>
          ×
        </button>
        {isLoading ? (
          <p className="flex flex-col flex-1 items-center justify-center text-[22px] md:text-[28px]">Loading...</p>
        ) : (
          <div className="flex flex-col flex-1 h-full md:size-full items-center justify-between">
            <p className="font-semibold font-inter text-gray_2 text-[16px]">{post?.role}:</p>
            <div className="flex flex-col flex-1 items-center justify-center size-full my-4">
              <p className="font-semibold font-inter text-[28px] leading-normal md:text-center">
                <span className="italic mr-1">&quot;</span>
                <span>{post?.message}</span>
                <span className="italic ml-1">&quot;</span>
              </p>
            </div>
            <div className="flex flex-row gap-6 items-center">
              {post && <Rating post={post} />}
              <CopiedButton id={post?.id as string} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DialogUrl;
