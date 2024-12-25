"use client";
import React from "react";
import { Button } from "../ui/button";
import {
  ChatMessageFilter,
  ChatRoom,
  CreateChatMember,
} from "@/types/chat.type";
import { toast } from "@/hooks/use-toast";
import { joinAction } from "@/action/chat-member.action";
import { Auth } from "@/types/auth.type";
import { ChatMemberRole } from "@/enum/chat.enum";
import { getChatRoomQueryKey } from "@/data/query/chat-message";
import { useQueryClient } from "@tanstack/react-query";
type Props = {
  room: ChatRoom;
  auth: Partial<Auth>;
  isAdmin: boolean;
};
export default function ChatBlur({ room, auth, isAdmin }: Props) {
  const queryClient = useQueryClient();
  const handleJoinRoom = async () => {
    const payload: CreateChatMember = {
      chat_room_id: room.id,
      role: isAdmin ? ChatMemberRole.ADMIN : ChatMemberRole.MEMBER,
      admin_id: isAdmin ? auth.id : undefined,
      user_id: isAdmin ? undefined : auth.id,
    };
    const { error } = await joinAction(payload);
    if (error) {
      toast({
        title: "Join Chat Room Error",
        description: error.error,
        variant: "destructive",
      });
    } else {
      queryClient.invalidateQueries({ queryKey: getChatRoomQueryKey(room.id) });
    }
  };
  return (
    <div className="absolute top-0 z-[999] flex h-full w-full items-center justify-center bg-card/80 backdrop-blur-md">
      <div className="grid place-items-center gap-2">
        <div>Do you want to join the chat room</div>
        <Button onClick={handleJoinRoom}>Join</Button>
      </div>
    </div>
  );
}
