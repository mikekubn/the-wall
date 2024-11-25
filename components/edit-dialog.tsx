/* eslint-disable tailwindcss/no-custom-classname */
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import useShortcut, { KEYS } from '@/hooks/use-shortcut';
import { PostProps } from '@/type';

const EditDialog: React.FC<{ callback: () => void }> = ({ callback }) => {
  const [post, setPost] = useState<PostProps | null>(null);
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const id = params.get('editId');

  const fetchPost = useCallback(async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/wisdom/admin/getAll`);
    const data: { success: boolean; items: PostProps[] } = await response.json();
    const item = data.items.find((i) => i.id === id);

    if (item) {
      setPost(item);
    }
  }, [id]);

  const closeModal = () => {
    setOpen(false);
    document.body.classList.remove('no-scroll');
    router.replace('/dashboard');
  };

  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).classList.contains('dialog-backdrop')) {
      closeModal();
    }
  };

  const handleSave = async () => {
    if (!post) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/wisdom/admin/update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, role: post.role, message: post.message }),
      });

      if (response.ok) {
        closeModal();
        callback();
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      console.error('Failed to save:', error);
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
      fetchPost();
    }
  }, [fetchPost, id]);

  if (!id) {
    return null;
  }

  return (
    isOpen && (
      <div className="dialog-backdrop fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={handleOutsideClick}>
        <div className="dialog-content bg-white shadow-lg relative flex flex-col w-[380px] h-fit min-h-[30%] md:size-1/2 rounded-[12px] p-4 md:p-12">
          {post ? (
            <div className="flex flex-col flex-1 h-full md:size-full items-center justify-between">
              <input
                id="role"
                placeholder="Developer"
                value={post?.role}
                onChange={(e) => setPost({ ...post, role: e.target.value })}
                className="text-[14px] w-[220px] border border-gray px-1.5 py-0.5 rounded-md"
              />
              <div className="flex flex-col flex-1 items-center justify-center size-full my-4">
                <textarea
                  id="message"
                  value={post?.message}
                  onChange={(e) => setPost({ ...post, message: e.target.value })}
                  placeholder="Write your wisdom"
                  className="text-[14px] w-2/3 border border-gray px-1.5 py-0.5 rounded-md"
                />
              </div>
              <button
                type="submit"
                onClick={handleSave}
                className="w-[180px] flex flex-col items-center justify-center md:text-[17px] text-white bg-blue rounded-[12px] py-2 hover:bg-white hover:text-black">
                Save
              </button>
            </div>
          ) : (
            <p className="text-[22px] md:text-[28px]">Loading...</p>
          )}
        </div>
      </div>
    )
  );
};

export default EditDialog;
