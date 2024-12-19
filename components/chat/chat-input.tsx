"use client";
import React, { useState } from "react";
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
import { sendMessageAction } from "@/action/chat-message.action";
import { Auth } from "@/types/auth.type";
type Props = {
  auth: Partial<Auth>;
  room: ChatRoom;
};
export default function ChatInput({ room, auth }: Props) {
  const [content, setContent] = useState("");
  const chat_member = room.chat_members.find(
    (member) => member.admin_id === auth.id || member.user_id === auth.id,
  );

  const handleSendMessage = async () => {
    if (!content.trim()) {
      toast({
        title: "Message content cannot be empty",
        variant: "destructive",
      });
      return;
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
    } else {
      setContent("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  return (
    <div className="flex h-10 items-center">
      <Input
        placeholder="Write something here"
        className="h-full rounded-br-none rounded-tr-none bg-popover"
        name="content"
        value={content}
        autoComplete="off"
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button
        variant="default"
        type="button"
        onClick={handleSendMessage}
        className="h-10 rounded-bl-none rounded-tl-none p-4"
      >
        <MdSend />
      </Button>
    </div>
  );
}
