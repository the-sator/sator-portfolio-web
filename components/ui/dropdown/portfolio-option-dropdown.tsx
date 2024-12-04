"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { Button } from "../button";
import { SlOptions } from "react-icons/sl";
import { FaPen } from "react-icons/fa6";
import { BsCloudUploadFill } from "react-icons/bs";
import { LinkButton } from "../button/link-button";
import { usePathname } from "next/navigation";
export default function PortfolioOptionDropdown() {
  const pathname = usePathname();
  console.log("pathname:", pathname);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="h-6 w-6 rounded-full p-1">
          <SlOptions />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit">
        <DropdownMenuItem className="p-0" onSelect={(e) => e.preventDefault()}>
          <LinkButton
            href={pathname + "/edit"}
            variant={"icon"}
            className="w-full justify-start gap-3 opacity-80 hover:opacity-100"
          >
            <FaPen size={12} />
            <span>Edit</span>
          </LinkButton>
        </DropdownMenuItem>

        <DropdownMenuItem className="p-0" onSelect={(e) => e.preventDefault()}>
          <Button
            variant={"icon"}
            className="w-full justify-start gap-3 opacity-80 hover:opacity-100"
          >
            <BsCloudUploadFill size={14} />
            <span>Publish</span>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
