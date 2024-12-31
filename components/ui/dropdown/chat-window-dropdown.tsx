"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { SlOptionsVertical } from "react-icons/sl";
import { Button } from "../button";
import { IoLogOutSharp } from "react-icons/io5";
import { ChatRoomDetailModal, ChatRoomInvite } from "../modal/chat-room-modals";
import { ChatRoom, InvitableChatMember } from "@/types/chat.type";
import useConfirmationStore from "@/store/confirmation";
import { leaveAction } from "@/action/chat-member.action";
import { toast } from "@/hooks/use-toast";
import { Auth } from "@/types/auth.type";
import { useParams } from "next/navigation";
type Props = {
  room: ChatRoom;
  auth: Partial<Auth>;
  member?: InvitableChatMember | null;
};
export default function ChatWindowDropdown({ room, member, auth }: Props) {
  const { openConfirmation } = useConfirmationStore();
  const params = useParams();
  const handleLeave = async () => {
    const id = params.id as string;
    if (!id) {
      toast({
        title: "No ID",
        variant: "destructive",
      });
      return;
    }
    const { error } = await leaveAction(id);
    if (error) {
      toast({
        title: "Leave Error",
        description: error.error,
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Leave Successful",
      variant: "success",
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"icon"} className="group h-fit w-fit rounded-full p-1">
          <SlOptionsVertical className="text-background opacity-50 group-hover:opacity-100" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="p-0" onSelect={(e) => e.preventDefault()}>
          <ChatRoomDetailModal room={room} auth={auth} />
        </DropdownMenuItem>
        {auth.role_id && (
          <DropdownMenuItem
            className="p-0"
            onSelect={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <ChatRoomInvite member={member} room={room} />
          </DropdownMenuItem>
        )}

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
              openConfirmation({
                title: "Are you absolutely sure?",
                description:
                  "This action cannot be undone. You are about to leave the chat room.",
                cancelLabel: "Cancel",
                actionLabel: "Confirm",
                onCancel: () => {},
                onAction: handleLeave,
              });
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
