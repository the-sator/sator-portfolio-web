"use client";

import { formatDate } from "@/utils/date";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "../data-table-columns/data-table-column-header";
import UserActionColumn from "../action-columns/user.action-column";
import { SiteUser } from "@/types/site-user.type";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const SiteUserColumn: ColumnDef<SiteUser>[] = [
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
    accessorKey: "website_name",
    header: "Website",
  },

  {
    accessorKey: "link",
    header: "Link",
  },

  {
    accessorKey: "api_key",
    header: "API Key",
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
    cell: UserActionColumn,
  },
];
