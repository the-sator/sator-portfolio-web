import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../dropdown-menu";
import { Button } from "../../button";
import { useOverlay } from "@/store/overlay";
import { MoreHorizontal } from "lucide-react";
import { useSelectedItem } from "@/store/selected-item";
import { SiteUser } from "@/types/site-user.type";
import { Row } from "@tanstack/react-table";
import { MODAL_KEY } from "@/constant/modal-key";

export default function SiteUserActionColumn({ row }: { row: Row<SiteUser> }) {
  const { id } = row.original;
  const { openModal } = useOverlay();
  const { setSelectedItem } = useSelectedItem();
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
        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="p-0">
          <Button
            variant={"ghost"}
            className="flex h-fit w-full justify-start px-2 py-1"
            onClick={() => {
              openModal(MODAL_KEY.API_KEY);
              setSelectedItem(id);
            }}
          >
            Show API Key
          </Button>
        </DropdownMenuItem>

        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="p-0">
          <Button
            variant={"ghost"}
            className="flex h-fit w-full justify-start px-2 py-1"
            onClick={() => {
              openModal(MODAL_KEY.SITE_USER_INFO);
              setSelectedItem(id);
            }}
          >
            View Detail
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
