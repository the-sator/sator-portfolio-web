"use client";
import { formatDate } from "@/utils/date";
import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "../data-table-columns/data-table-column-header";
import { Admin } from "@/types/admin.type";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import Tag from "../../tag";
import { AdminActionColumn } from "../action-columns/admin.action-column";
export const AdminColumns: ColumnDef<Admin>[] = [
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
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),

    cell: ({ row }) => {
      let color;

      switch (row.original.role.name) {
        case "Admin":
          color = "blue";
          break;
        case "Super Admin":
          color = "indigo";
          break;
        case "User":
          color = "green";
          break;
        default:
          color = "yellow";
      }
      return (
        <div className="min-w-24">
          <Tag color={color}>{row.original.role.name}</Tag>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      //Format Date
      return formatDate(row.getValue("createdAt"));
    },
  },
  {
    accessorKey: "totp_key",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="2FA" />
    ),
    cell: ({ row }) => {
      //Format Date
      return !!row.getValue("totp_key") ? (
        <FaCheck className="size-6 text-green-400" />
      ) : (
        <IoClose className="size-6 text-red-400" />
      );
    },
  },
  {
    id: "actions",
    cell: AdminActionColumn,
  },
];
