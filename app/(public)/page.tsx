import Post from '@/components/post';
import SortMenu from '@/components/sort-menu';
import React, { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { PostProps } from '@/type';
import { getPosts } from '@/lib/queries';

const HomePage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
  const sort = (await searchParams).sort as string;
  const id = (await searchParams).id as string;
  const items: PostProps[] = await getPosts();
  const posts = items?.sort((a, b) => {
    if (sort === 'new') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }

    if (sort === 'old') {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }

    if (sort === 'like') {
      const averageA = (Number(a.rate?.up) + Number(a.rate?.down)) / 2;
      const averageB = (Number(b.rate?.up) + Number(b.rate?.down)) / 2;

      return averageB - averageA;
    }

    return 0;
  });

  if (!sort) {
    if (id) {
      redirect(`/?sort=new&id=${id}`);
    }
    redirect('/?sort=new');
  }

  return (
    <section className="w-full flex flex-1 flex-col">
      <Suspense
        fallback={
          <div className="flex flex-1 flex-row justify-center w-full h-[24px] mb-10">
            <div className="animate-pulse bg-gray_5 h-[24px] w-[300px] rounded-[12px]" />
          </div>
        }>
        <SortMenu />
      </Suspense>
      <div className="w-full flex flex-row flex-wrap items-start md:items-center justify-center flex-1 gap-6 md:gap-y-10">
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

export default HomePage;
