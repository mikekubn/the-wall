import DialogUrl from '@/components/dialog-url';
import Post from '@/components/post';
import SortMenu from '@/components/sort-menu';
import { items, SortProps } from '@/type';
import React, { Suspense } from 'react';

const HomePage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
  const params = await searchParams;
  const sort = {
    sort: params.sort as string,
    id: params.id as string,
  } as unknown as SortProps;

  console.log('sort', sort);

  return (
    <section className="w-full flex flex-1 flex-col">
      <Suspense fallback={<div>Loading...</div>}>
        <SortMenu />
      </Suspense>
      <div className="w-full flex flex-row flex-wrap items-center justify-center flex-1 gap-6 md:gap-y-10">
        {Array.from({ length: 50 }, () => items.map((item) => <Post key={item?.id} post={item} />))}
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <DialogUrl />
      </Suspense>
    </section>
  );
};

export default HomePage;
