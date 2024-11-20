import DialogUrl from '@/components/dialog-url';
import Post from '@/components/post';
import SortMenu from '@/components/sort-menu';
import { items } from '@/type';
import React, { Suspense } from 'react';
import { redirect } from 'next/navigation';

const HomePage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
  const sort = (await searchParams).sort as string;
  const id = (await searchParams).id as string;

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
      <div className="w-full flex flex-row flex-wrap items-center justify-center flex-1 gap-6 md:gap-y-10">
        {Array.from({ length: 50 }, () =>
          items.map((post) => (
            <Suspense key={post.id} fallback={<div>Loading...</div>}>
              <Post post={post} />
            </Suspense>
          )),
        )}
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <DialogUrl />
      </Suspense>
    </section>
  );
};

export default HomePage;
