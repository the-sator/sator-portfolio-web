"use client";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { MdSend } from "react-icons/md";
import {
  ChatMessageType,
  ChatRoom,
  CreateChatMessage,
} from "@/types/chat.type";
import { Admin } from "@/types/admin.type";
import { toast } from "@/hooks/use-toast";
import { redirect } from "next/navigation";
import { sendMessageAction } from "@/action/chat-message.action";
type Props = {
  room: ChatRoom;
  admin: Admin;
};
export default function ChatInput({ room, admin }: Props) {
  const chat_member = room.chat_members.find(
    (member) => member.admin_id === admin.id,
  );

  const handleSendMessage = async (formData: FormData) => {
    const content = formData.get("content")?.toString() || "";
    if (!content && content.length < 0) {
      toast({
        title: "Message content cannot be empty",
        variant: "destructive",
      });
    }
    if (!chat_member) {
      toast({
        title: "You are not a member",
        variant: "destructive",
      });
      return;
    }
    const payload: CreateChatMessage = {
      chat_member_id: chat_member.id,
      chat_room_id: room.id,
      content: content,
      message_type: ChatMessageType.TEXT,
    };

    const { error } = await sendMessageAction(payload);
    if (error) {
      toast({
        title: "Send Message Error",
        description: error.error,
        variant: "destructive",
      });
      redirect("/admin-panel");
    }
  };
  return (
    <form action={handleSendMessage} className="flex h-10 items-center">
      <Input
        placeholder="Write something here"
        className="h-full rounded-br-none rounded-tr-none bg-popover"
        name="content"
        autoComplete="off"
      />
      <Button
        variant="default"
        className="h-10 rounded-bl-none rounded-tl-none p-4"
      >
        <MdSend />
      </Button>
    </form>
  );
}
