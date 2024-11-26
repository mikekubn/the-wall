/* eslint-disable tailwindcss/no-custom-classname */
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, MouseEvent, useState, FormEvent, useCallback } from 'react';
import useShortcut, { KEYS } from '@/hooks/use-shortcut';
import { PostProps } from '@/type';
import clsx from 'clsx';
import { useToast } from '@/hooks/use-toast';

const EditDialog = () => {
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const id = params.get('editId');
  const [post, setPost] = useState<PostProps | undefined>();
  const [isLoading, setIsLoding] = useState(false);

  const closeModal = () => {
    document.body.classList.remove('no-scroll');
    router.replace('/dashboard');
  };

  const handleOutsideClick = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).classList.contains('dialog-backdrop')) {
      closeModal();
    }
  };

  const fetchData = useCallback(async () => {
    setIsLoding(true);
    if (!id) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/wisdom/admin/get?id=${id}`);
      const data: { success: boolean; item: PostProps } = await response.json();

      if (response.ok) {
        setPost(data?.item);
      } else {
        throw new Error('Failed to fetch');
      }
    } catch (error) {
      console.error('Failed to fetch:', error);
    } finally {
      setIsLoding(false);
    }
  }, [id]);

  const handleSubmitUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!post) return;

    const payload: PostProps = {
      ...post,
      role: post.role,
      message: post.message,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/wisdom/admin/update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...payload }),
      });

      if (response.ok) {
        toast({
          title: 'Success 🎉',
          description: "Post's updated successfully.",
        });
        closeModal();
      } else {
        toast({
          title: 'Error 🚨',
          description: 'Failed to update post.',
        });
      }
    } catch (error) {
      toast({
        title: 'Error 🚨',
        description: `Failed to update post: ${(error as Error).message}`,
      });
    }
  };

  useShortcut(KEYS.ESCAPE, () => {
    closeModal();
  });

  useEffect(() => {
    if (id) {
      fetchData();
      document.body.classList.add('no-scroll');
    } else {
      setPost(undefined);
    }
  }, [fetchData, id]);

  if (!id) {
    return null;
  }

  return (
    <div className="dialog-backdrop fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={handleOutsideClick}>
      <div className="dialog-content bg-white shadow-lg relative flex flex-col w-[380px] h-fit min-h-[30%] md:size-1/2 rounded-[12px] p-4 md:p-12">
        {isLoading ? (
          <div className="flex flex-col flex-1 items-center justify-center">
            <p>Loading ...</p>
          </div>
        ) : (
          <form id="edit-form" className="flex flex-col flex-1 h-full md:size-full items-center justify-between" onSubmit={handleSubmitUpdate}>
            <h1
              className={clsx('mb-4', {
                'text-rose-600': post?.status === 'REJECTED',
                'text-lime-600': post?.status === 'APPROVED',
                'text-yellow-600': post?.status === 'PENDING',
              })}>
              {post?.status}
            </h1>
            <input
              id="role"
              name="role"
              value={post?.role}
              onChange={(e) => {
                if (post) {
                  setPost({ ...post, role: e.target.value });
                }
              }}
              placeholder="Developer"
              className="text-[14px] w-[220px] border border-gray px-1.5 py-0.5 rounded-md"
            />
            <div className="flex flex-col flex-1 items-center justify-center size-full my-4">
              <textarea
                id="message"
                name="message"
                value={post?.message}
                onChange={(e) => {
                  if (post) {
                    setPost({ ...post, message: e.target.value });
                  }
                }}
                placeholder="Write your wisdom"
                className="text-[14px] w-2/3 border border-gray px-1.5 py-0.5 rounded-md"
              />
            </div>
            <button
              type="submit"
              className="w-[180px] flex flex-col items-center justify-center md:text-[17px] text-white bg-blue rounded-[12px] py-2 hover:bg-white hover:text-black">
              Save
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditDialog;
