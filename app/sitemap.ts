import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';
import { Post } from '@prisma/client';

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const posts: Post[] = await prisma.post.findMany({
    where: {
      status: 'APPROVED',
    },
  });

  const urls = posts.map((post) => ({
    url: `https://thewallofdigitalwisdom.tech/post/${post.id}`,
    lastModified: new Date(post.createdAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: 'https://thewallofdigitalwisdom.tech',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    ...urls,
  ];
};

export default sitemap;
