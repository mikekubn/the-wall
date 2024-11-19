import DialogUrl from '@/components/dialog-url';
import Post from '@/components/post';
import SortMenu from '@/components/sort-menu';
import { items } from '@/type';
import React, { Suspense } from 'react';

const HomePage = () => {
  return (
    <section className="w-full flex flex-1 flex-col">
      <Suspense fallback={<div>Loading...</div>}>
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
