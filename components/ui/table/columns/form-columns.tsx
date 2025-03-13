"use client";
import { formatDate } from "@/utils/date";
import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "../data-table-columns/data-table-column-header";
import { FormAttempt } from "@/types/portfolio-form.type";
import { priceRangeToString } from "@/utils/string";
import { FormActionColumn } from "../action-columns/form-action-column";
export const FormColumn: ColumnDef<FormAttempt>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
  },

  {
    accessorKey: "quoted_price",
    header: "Price",
    cell: ({ row }) => {
      return priceRangeToString(row.getValue("quoted_price"));
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      //Format Date
      return formatDate(row.getValue("created_at"));
    },
  },
  {
    id: "actions",
    cell: FormActionColumn,
  },
];
