'use client';

import * as React from 'react';
import { ColumnDef, SortingState, VisibilityState, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PostProps } from '@/type';
import clsx from 'clsx';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import EditDialog from '@/components/edit-dialog';

type PostUpdateProps = Pick<PostProps, 'id' | 'status' | 'message' | 'role'>;

const createColumns = ({ handleUpdatePostData }: { handleUpdatePostData: ({ post }: { post: PostUpdateProps }) => void }): ColumnDef<PostProps>[] => [
  {
    accessorKey: 'id',
    header: 'ID',
    enableHiding: true,
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => {
      const value = row.getValue('createdAt');
      const date = new Date(value as string | number | Date);
      const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' };
      const formattedDate = date.toLocaleDateString('en-US', options);

      return <p>{formattedDate}</p>;
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <button onClick={column.getToggleSortingHandler()} className="font-bold">
          Status {column.getIsSorted() === 'asc' ? '✅' : column.getIsSorted() === 'desc' ? '⭕️' : '👀'}
        </button>
      );
    },
    sortingFn: (rowA, rowB) => {
      const statusOrder = { APPROVED: 1, PENDING: 2, REJECTED: 3 };
      const statusA = rowA.getValue<'APPROVED' | 'PENDING' | 'REJECTED'>('status');
      const statusB = rowB.getValue<'APPROVED' | 'PENDING' | 'REJECTED'>('status');

      return (statusOrder[statusA] || 999) - (statusOrder[statusB] || 999);
    },
    cell: ({ row }) => (
      <div
        className={clsx('capitalize', {
          'text-lime-600': row.getValue('status') === 'APPROVED',
          'text-rose-600': row.getValue('status') === 'REJECTED',
          'text-yellow-600': row.getValue('status') === 'PENDING',
        })}>
        {row.getValue('status')}
      </div>
    ),
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => <div className="max-w-[80px] line-clamp-2">{row.getValue('role')}</div>,
  },
  {
    accessorKey: 'message',
    header: 'Message',
    cell: ({ row }) => <div className="max-w-[250px] line-clamp-2">{row.getValue('message')}</div>,
  },
  {
    accessorKey: 'actions',
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      return (
        <div className="flex flex-row flex-1 justify-center gap-3">
          <Link href={{ query: { editId: row.getValue('id') } }} className="text-blue hover:text-black">
            Edit
          </Link>
          <button
            disabled={row.getValue('status') === 'APPROVED'}
            onClick={() =>
              handleUpdatePostData({
                post: {
                  id: row.getValue('id'),
                  status: 'APPROVED',
                  role: row.getValue('role'),
                  message: row.getValue('message'),
                },
              })
            }
            className="text-lime-600 hover:text-black disabled:cursor-not-allowed">
            Approve
          </button>
          <button
            disabled={row.getValue('status') === 'REJECTED'}
            onClick={() =>
              handleUpdatePostData({
                post: {
                  id: row.getValue('id'),
                  status: 'REJECTED',
                  role: row.getValue('role'),
                  message: row.getValue('message'),
                },
              })
            }
            className="text-rose-600 hover:text-black disabled:cursor-not-allowed">
            Reject
          </button>
        </div>
      );
    },
  },
];

const PostsTable: React.FC<{ posts: PostProps[] }> = ({ posts }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [sorting, setSorting] = React.useState<SortingState>([{ id: 'status', desc: false }]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
    id: false,
  });
  const [rowSelection, setRowSelection] = React.useState({});

  const updatePostData = useCallback(
    async ({ post }: { post: PostUpdateProps }) => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/wisdom/admin/update`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...post }),
        });

        const data = await response.json();

        if (data?.success) {
          router.refresh();

          toast({
            title: 'Success 🎉',
            description: "Post's status updated successfully",
          });
        } else {
          toast({
            title: 'Error 🚨',
            description: 'Failed to update post status',
          });
        }
      } catch (error) {
        toast({
          title: 'Error 🚨',
          description: `Failed to update post status: ${(error as Error).message}`,
        });
      }
    },
    [router, toast],
  );

  const columns = React.useMemo(() => createColumns({ handleUpdatePostData: updatePostData }), [updatePostData]);

  const table = useReactTable<PostProps>({
    data: posts,
    columns,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <EditDialog />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {Boolean(posts.length) ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PostsTable;
