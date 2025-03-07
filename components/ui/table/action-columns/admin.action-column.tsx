import { useOverlay } from "@/store/overlay";
import { Admin } from "@/types/admin.type";
import { Row } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../../button";
import { useSelectedItem } from "@/store/selected-item";
import { MODAL_KEY } from "@/constant/modal-key";

export const AdminActionColumn = ({ row }: { row: Row<Admin> }) => {
  const Admin = row.original;
  const { setSelectedItem } = useSelectedItem();
  const { openModal } = useOverlay();
  return (
    <DropdownMenu>
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
          onClick={() => navigator.clipboard.writeText(Admin.id)}
        >
          Copy User ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="p-0">
          <Button
            variant={"ghost"}
            className="flex h-fit w-full justify-start px-2 py-1"
            onClick={() => {
              setSelectedItem(Admin.id);
              openModal(MODAL_KEY.ADMIN);
            }}
          >
            Assign Role
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
