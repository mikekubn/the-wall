'use client';

import React from 'react';
import { ChevronUp } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { PostProps } from '@/type';

const Rating: React.FC<{ post: PostProps }> = ({ post }) => {
  const [up, setUp] = React.useState(post?.rate.up);
  const [down, setDown] = React.useState(post?.rate.down);

  const handleRateUp = () => {
    setUp(up + 1);
  };

  const handleRateDown = () => {
    setDown(down - 1);
  };

  return (
    <div className="inline-flex gap-2 md:gap-4">
      <button onClick={handleRateUp} className="inline-flex items-center gap-1 text-lime-700 group-hover:text-white">
        <ChevronUp className="size-[16px]" />
        <span className="text-[16px]">{up}</span>
      </button>
      <button onClick={handleRateDown} className="inline-flex items-center gap-1 text-rose-600 group-hover:text-white">
        <ChevronDown className="size-[16px]" />
        <span className="text-[16px]">{down}</span>
      </button>
    </div>
  );
};

export default Rating;
