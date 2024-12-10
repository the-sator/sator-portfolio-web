import { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../select";
import { Button } from "../../button";
import { PaginateMetadata } from "@/types/base.type";
import { LIMIT } from "@/constant/base";
import { usePathname, useRouter } from "next/navigation";
import { TransitionStartFunction } from "react";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  metadata?: PaginateMetadata | null;
  startTransition: TransitionStartFunction;
}

export function DataTablePaginationRemote<TData>({
  table,
  metadata,
  startTransition,
}: DataTablePaginationProps<TData>) {
  const pathname = usePathname();
  const router = useRouter();
  const updateQueryParams = (key: string, value: string) => {
    const params = new URLSearchParams();
    console.log("params:", params);
    params.set(key, value);
    startTransition(() => {
      const queryString = params.toString();
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
      router.push(newUrl);
    });
  };
  return (
    <div className="flex justify-end px-2">
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm text-label">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
              updateQueryParams("limit", value);
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm text-label">
          Page {metadata && metadata.currentPage ? metadata.currentPage : 1} of{" "}
          {/* {table.getPageCount()} */}
          {metadata && metadata.count ? Math.ceil(metadata.count / LIMIT) : 1}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => updateQueryParams("page", String(1))}
            disabled={metadata && metadata.page ? true : false}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() =>
              updateQueryParams(
                "page",
                String(metadata && metadata.page ? metadata.page - 1 : 1),
              )
            }
            disabled={metadata && metadata.page ? true : false}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => updateQueryParams("page", String(metadata?.page))}
            disabled={metadata && metadata.page ? false : true}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() =>
              updateQueryParams(
                "page",
                String(
                  metadata && metadata.count
                    ? Math.ceil(metadata.count / LIMIT)
                    : 1,
                ),
              )
            }
            disabled={metadata && metadata.page ? false : true}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
