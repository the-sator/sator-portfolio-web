"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { Button } from "../button";
import { ChevronsUpDown } from "lucide-react";
import { IoLogOutSharp } from "react-icons/io5";
import { toast } from "@/hooks/use-toast";
import { signout } from "@/action/auth.action";
import { Session } from "@/types/base.type";
type Props = {
  session: Session;
};
export default function ProfileConfigDropdown({ session }: Props) {
  const handleSignout = async () => {
    const { error } = await signout(session.id);
    if (error) {
      toast({
        title: "Error Signing Out",
        description: error.error,
        variant: "destructive",
      });
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="group flex h-12 w-full justify-between px-2"
          variant="ghost"
        >
          <div className="flex items-center gap-2">
            <Avatar className="size-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-left text-sm">Ponleu</p>
              <p className="text-xs text-muted-foreground group-hover:text-accent-foreground/50">
                ponleu@gmail.com
              </p>
            </div>
          </div>
          <ChevronsUpDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="p-0"
            onSelect={(e) => e.preventDefault()}
          >
            <Button
              variant={"icon"}
              onClick={handleSignout}
              className="flex h-fit w-full items-center justify-start px-2 py-2 font-normal text-red-400"
            >
              <IoLogOutSharp className="text-red-500" />
              <p className="text-red-500">Logout</p>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
