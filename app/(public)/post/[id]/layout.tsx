import React, { Suspense } from 'react';
import { LayoutProps, PostProps } from '@/type';
import type { Metadata } from 'next';

import { getPosts } from '@/lib/queries';
import Post from '@/components/post';

export const metadata: Metadata = {
  metadataBase: new URL('https://thewallofdigitalwisdom.tech'),
  openGraph: {
    images: '/og-image.png',
  },
};

const PostLayout: React.FC<LayoutProps> = async ({ children }) => {
  const posts: PostProps[] = await getPosts();

  return (
    <section className="w-full flex flex-1 flex-col">
      {children}
      <div className="w-full flex flex-row flex-wrap items-start md:items-center justify-center flex-1 mt-[24px] md:mt-[40px] gap-6 md:gap-y-10">
        {posts?.map((post) => (
          <Suspense
            key={post.id}
            fallback={<div className="animate-pulse relative h-[220px] w-[90%] md:w-[406px] md:h-[251px] rounded-[12px] bg-gray_5" />}>
            <Post post={post} />
          </Suspense>
        ))}
      </div>
    </section>
  );
};

export default PostLayout;
