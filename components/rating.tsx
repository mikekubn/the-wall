'use client';

import React from 'react';
import { ChevronUp } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { PostProps } from '@/type';
import { ReactComponent as LoadingSpinner } from '@/public/loading.svg';
import { useRouter } from 'next/navigation';

const Rating: React.FC<{ post: PostProps }> = ({ post }) => {
  const router = useRouter();
  const [up, setUp] = React.useState(Number(post?.rate?.up));
  const [down, setDown] = React.useState(Number(post?.rate?.down));
  const [isLoading, setIsLoading] = React.useState(false);

  const updateRate = async (status: 'UP' | 'DOWN') => {
    setIsLoading(true);

    try {
      const payload = {
        id: post.id,
        up: status === 'UP',
        down: status === 'DOWN',
      };

      const res = await fetch('/api/wisdom/update-rate', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...payload }),
      });
      if (res.ok) {
        const data: { success: boolean; rate: PostProps['rate'] } = await res.json();

        if (data.success) {
          await new Promise((resolve) => setTimeout(resolve, 500));
          setUp(Number(data?.rate?.up));
          setDown(Number(data?.rate?.down));

          router.refresh();
        }
      }
    } catch (error) {
      console.error('Error updating rate', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="inline-flex items-center gap-2">
      {isLoading && <LoadingSpinner className="size-[16px] stroke-gray_3 group-hover:stroke-white" />}
      <div className="inline-flex items-center gap-4">
        <button
          disabled={isLoading}
          onClick={() => updateRate('UP')}
          className="inline-flex items-center gap-1 text-lime-700 group-hover:text-white disabled:cursor-not-allowed">
          <ChevronUp className="size-[16px]" />
          <span className="text-[16px]">{up}</span>
        </button>
        <button
          disabled={isLoading}
          onClick={() => updateRate('DOWN')}
          className="inline-flex items-center gap-1 text-rose-600 group-hover:text-white disabled:cursor-not-allowed">
          <ChevronDown className="size-[16px]" />
          <span className="text-[16px]">{down}</span>
        </button>
      </div>
    </div>
  );
};

export default Rating;
