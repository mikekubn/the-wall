'use client';

import * as React from 'react';
import { ColumnDef, SortingState, VisibilityState, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PostProps } from '@/type';
import clsx from 'clsx';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';
import EditDialog from '@/components/edit-dialog';

type Props = {
  id: PostProps['id'];
  role: PostProps['role'];
  message: PostProps['message'];
  createdAt: PostProps['createdAt'];
  status: PostProps['status'];
};

const createColumns = (fetchData: () => Promise<void>): ColumnDef<Props>[] => [
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
    header: ({ column }) => (
      <button onClick={column.getToggleSortingHandler()} className="font-bold">
        Status {column.getIsSorted() === 'asc' ? '✅' : column.getIsSorted() === 'desc' ? '⭕️' : '👀'}
      </button>
    ),
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
      const handleStatusChange = async (status: PostProps['status']) => {
        const id = row.getValue('id');
        const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/wisdom/admin/update`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id, status }),
        });

        const data = await response.json();

        await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/wisdom/admin/getAll`);

        if (data?.success) {
          fetchData();

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
      };

      return (
        <div className="flex flex-row flex-1 justify-center gap-3">
          <Link href={{ query: { editId: row.getValue('id') } }} className="text-blue hover:text-black">
            Edit
          </Link>
          <button
            onClick={() => {
              handleStatusChange('APPROVED');
            }}
            className="text-lime-600 hover:text-black">
            Approve
          </button>
          <button
            onClick={() => {
              handleStatusChange('REJECTED');
            }}
            className="text-rose-600 hover:text-black">
            Reject
          </button>
        </div>
      );
    },
  },
];

const DataTableDemo = () => {
  const [data, setData] = React.useState<Props[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [sorting, setSorting] = React.useState<SortingState>([{ id: 'status', desc: false }]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
    id: false,
  });
  const [rowSelection, setRowSelection] = React.useState({});

  const fetchData = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const promise = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/wisdom/admin/getAll`);
      const response: { success: boolean; items: PostProps[] } = await promise.json();
      const sortItems = response?.items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setData(sortItems);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const columns = React.useMemo(() => createColumns(fetchData), [fetchData]);

  const table = useReactTable({
    data,
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
      <EditDialog callback={() => fetchData()} />
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
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : data?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DataTableDemo;
