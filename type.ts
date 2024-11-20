export type SortProps = 'new' | 'like' | 'old';

export interface PostProps {
  id: string;
  role: string;
  message: string;
  date: string;
  rate: {
    up: number;
    down: number;
  };
}

export const items = [
  {
    id: '1',
    role: 'Project Manager',
    message: 'Frontend komunikuje s backandem.',
    date: '2021-09-01T00:00:00.000Z',
    rate: {
      up: 1200,
      down: 50,
    },
  },
  {
    id: '2',
    role: 'Frontend Developer',
    message: 'Frontend komunikuje s backandem, já jsem byl head of strategy v Raiffce!',
    date: '2021-09-02T00:00:00.000Z',
    rate: {
      up: 1000,
      down: 100,
    },
  },
];
