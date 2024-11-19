'use client';

import React from 'react';
import { PostProps } from '@/type';
import { ChevronUp } from 'lucide-react';
import { ChevronDown } from 'lucide-react';

const Rating: React.FC<{ post: PostProps }> = ({ post }) => {
  const [up, setUp] = React.useState(post?.rate.up);
  const [down, setDown] = React.useState(post?.rate.down);

  const handleRateUp = () => {
    setUp(up + 1);
  };

  const handleRateDown = () => {
    if (down === 0) return;

    setDown(down - 1);
  };

  return (
    <div className="inline-flex gap-2 md:gap-4 text-gray_1 group-hover:text-white">
      <button onClick={handleRateUp} className="inline-flex items-center gap-1 hover:opacity-60">
        <ChevronUp className="size-[12px] md:size-[16px]" />
        <span className="text-[12px] md:text-[16px]">{up}</span>
      </button>
      <button onClick={handleRateDown} className="inline-flex items-center gap-1 hover:opacity-60">
        <ChevronDown className="size-[12px] md:size-[16px]" />
        <span className="text-[12px] md:text-[16px]">{down}</span>
      </button>
    </div>
  );
};

export default Rating;
