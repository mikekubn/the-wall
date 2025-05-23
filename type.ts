import { Rate, Post } from '@prisma/client';

export type SortProps = 'new' | 'like' | 'old';

export interface PostProps extends Post {
  rate: Rate | null;
}

export interface LayoutProps {
  children: React.ReactNode;
}
