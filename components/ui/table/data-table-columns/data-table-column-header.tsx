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
    <div className="flex items-center gap-2">
      <span>{title}</span>
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="p-2 h-6 w-6"
      >
        {column.getIsSorted() === "desc" ? (
          <ArrowDown />
        ) : column.getIsSorted() === "asc" ? (
          <ArrowUp />
        ) : (
          <ChevronsUpDown />
        )}
      </Button>
    </div>
  );
}
