"use client";

import {
  ColumnDef,
  // ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { DataTablePagination } from "./table/data-table-columns/data-table-columns-pagination";
import { HttpError, PaginateMetadata } from "@/types/base.type";
import { toast } from "@/hooks/use-toast";
import Spinner from "./spinner";
import { DataTablePaginationRemote } from "./table/data-table-columns/data-table-columns-pagination-remote";
import { useQueryParamsContext } from "@/context/query-params-provider";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  error?: HttpError | null;
  showPagination?: boolean;
  metadata?: PaginateMetadata | null;
  remote?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  error,
  showPagination = true,
  metadata,
  remote = false,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const { isPending } = useQueryParamsContext();

  useEffect(() => {
    console.log("isPending:", isPending);
  }, [isPending]);

  // const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  useEffect(() => {
    if (error) {
      toast({
        title: "Something Went Wrong",
        description: error.error,
        variant: "destructive",
      });
    }
  }, [error]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,

    // onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      rowSelection,
      columnVisibility,
    },
  });

  return (
    <div>
      <div className="my-4 mb-4 rounded-md border">
        <Table className="relative">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isPending && (
              <tr>
                <td className="absolute z-50 flex min-h-[calc(100%-42.5px)] w-full items-center justify-center bg-background/50">
                  <Spinner size={30} />
                </td>
              </tr>
            )}
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {showPagination && (
        <>
          {remote ? (
            <DataTablePaginationRemote table={table} metadata={metadata} />
          ) : (
            <DataTablePagination table={table} />
          )}
        </>
      )}
    </div>
  );
}
