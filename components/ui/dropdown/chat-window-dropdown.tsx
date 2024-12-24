"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { SlOptionsVertical } from "react-icons/sl";
import { BiSolidCommentDetail } from "react-icons/bi";
import { Button } from "../button";
import { IoLogOutSharp, IoPersonAdd } from "react-icons/io5";
import { ChatRoomDetailModal, ChatRoomInvite } from "../modal/chat-room-modals";
import { ChatRoom, InvitableChatMember } from "@/types/chat.type";
type Props = {
  room: ChatRoom;
  member?: InvitableChatMember | null;
};
export default function ChatWindowDropdown({ room, member }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"icon"} className="group h-fit w-fit rounded-full p-1">
          <SlOptionsVertical className="text-background opacity-50 group-hover:opacity-100" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="p-0" onSelect={(e) => e.preventDefault()}>
          <ChatRoomDetailModal room={room} />
        </DropdownMenuItem>

        <DropdownMenuItem
          className="p-0"
          onSelect={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <ChatRoomInvite member={member} room={room} />
        </DropdownMenuItem>

        <DropdownMenuItem
          className="p-0 text-red-500"
          onSelect={(e) => e.preventDefault()}
        >
          <Button
            variant={"icon"}
            className="h-4 w-full justify-start gap-3 py-4 opacity-80 hover:text-red-500 hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <IoLogOutSharp size={14} />
            <span>Leave</span>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
