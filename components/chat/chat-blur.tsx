"use client";
import React from "react";
import { Button } from "../ui/button";
import { ChatMemberRole, ChatRoom, CreateChatMember } from "@/types/chat.type";
import { Admin } from "@/types/admin.type";
import { toast } from "@/hooks/use-toast";
import { joinAction } from "@/action/chat-member.action";
type Props = {
  room: ChatRoom;
  admin: Admin;
};
export default function ChatBlur({ room, admin }: Props) {
  const handleJoinRoom = async () => {
    const payload: CreateChatMember = {
      chat_room_id: room.id,
      role: ChatMemberRole.ADMIN,
      admin_id: admin.id,
    };
    const { error } = await joinAction(payload);
    if (error) {
      toast({
        title: "Join Chat Room Error",
        description: error.error,
        variant: "destructive",
      });
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
