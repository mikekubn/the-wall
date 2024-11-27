'use client';

import React from 'react';
import { Link } from 'lucide-react';
import { PostProps } from '@/type';
import { useSearchParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const ShareButton: React.FC<{ id: PostProps['id'] }> = ({ id }) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const sort = params.get('sort');
  const { toast } = useToast();

  const handleCopyUrl = React.useCallback(() => {
    try {
      const url = `${window.location.origin}/post/${id}?sort=${sort}`;
      navigator.clipboard.writeText(url);
      toast({
        description: `Copied: ${url}`,
      });
    } catch (error) {
      console.error('Failed to copy: ', error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, sort]);

  return (
    <button onClick={handleCopyUrl} className="inline-flex gap-1 text-gray_1 group-hover:text-white size-[16px]">
      <Link className="size-[16px]" />
    </button>
  );
};

export default ShareButton;
