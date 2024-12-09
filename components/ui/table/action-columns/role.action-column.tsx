import { adminDeleteRole } from "@/action/role.action";
import { toast } from "@/hooks/use-toast";
import useConfirmationStore from "@/store/confirmation";
import { useOverlay } from "@/store/overlay";
import { useSelectedItem } from "@/store/selected-item";
import { Role } from "@/types/role.type";
import { Row } from "@tanstack/react-table";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../../button";

export const RoleActionColumn = ({ row }: { row: Row<Role> }) => {
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
        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="p-0">
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
        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="p-0">
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
};
