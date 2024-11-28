"use client";
import { formatDate } from "@/utils/date";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../../button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "../data-table-columns/data-table-column-header";
import { Role } from "@/types/role.type";
import { useEffect, useState } from "react";
import { EditRoleModal } from "@/components/ui/modal/role-modal";
import DeleteAlertDialog from "../../confirmation-dialog";
import { useOverlay } from "@/store/overlay";
import useConfirmationStore from "@/store/confirmation";
import { adminDeleteRole } from "@/action/role.action";
import { toast } from "@/hooks/use-toast";
import { useSelectedItem } from "@/store/selected-item";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const RoleColumns: ColumnDef<Role>[] = [
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
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
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
    cell: ({ row }) => {
      const Role = row.original;
      const [open, setOpen] = useState(false);
      const { openConfirmation } = useConfirmationStore();
      const { setSelectedItem } = useSelectedItem();
      const { setShowModal } = useOverlay();
      const handleDelete = async () => {
        const { error } = await adminDeleteRole(Role.id);
        if (error) {
          toast({
            title: "Error Delete Role",
            description: error.error,
            variant: "destructive",
            duration: 1500,
          });
        } else {
          toast({
            title: "Role Deleted",
            variant: "success",
            duration: 1500,
          });
        }
      };
      return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="sr-only text-label">
              Actions
            </DropdownMenuLabel>
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="p-0"
            >
              <Button
                variant={"ghost"}
                className="flex h-fit w-full justify-start px-2 py-1"
                onClick={() => {
                  setSelectedItem(Role.id);
                  setShowModal(true);
                }}
              >
                Edit
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="p-0"
            >
              <Button
                className="flex h-fit w-full justify-start px-2 py-1 text-red-500 hover:text-red-400"
                variant={"ghost"}
                onClick={() => {
                  openConfirmation({
                    title: "Are you absolutely sure?",
                    description:
                      "This action cannot be undone. This will permanently remove your data from our servers",
                    cancelLabel: "Cancel",
                    actionLabel: "Confirm",
                    onCancel: () => {},
                    onAction: handleDelete,
                  });
                }}
              >
                Delete
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
