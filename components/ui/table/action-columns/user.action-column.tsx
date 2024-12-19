import { User } from "@/types/user.type";
import { Row } from "@tanstack/react-table";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../../button";
import useConfirmationStore from "@/store/confirmation";
import { useOverlay } from "@/store/overlay";
import { useSelectedItem } from "@/store/selected-item";

export default function UserActionColumn({ row }: { row: Row<User> }) {
  const User = row.original;
  const [open, setOpen] = useState(false);
  const { openConfirmation } = useConfirmationStore();
  //TODO: Delete user
  const handleDelete = () => {
    console.log("DELETE USER...");
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
}
