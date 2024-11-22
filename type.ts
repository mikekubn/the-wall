export type SortProps = 'new' | 'like' | 'old';

export type Status = 'pending' | 'approved' | 'rejected';

export interface PostProps {
  id: string;
  createdAt: string;
  role: string;
  message: string;
  status: Status;
  rate: {
    up: number;
    down: number;
  };
}

export const item: PostProps = {
  id: crypto.randomUUID(),
  createdAt: new Date().toISOString(),
  role: 'Developer',
  message: 'Hello, World!',
  status: 'pending',
  rate: {
    up: 0,
    down: 0,
  },
};
