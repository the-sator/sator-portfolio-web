import { Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "../../button";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className="flex flex-shrink-0 items-center gap-2">
      <span>{title}</span>
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-6 w-6 flex-shrink-0 p-0"
      >
        {column.getIsSorted() === "desc" ? (
          <ArrowDown size={14} />
        ) : column.getIsSorted() === "asc" ? (
          <ArrowUp size={14} />
        ) : (
          <ChevronsUpDown size={14} />
        )}
      </Button>
    </div>
  );
}
