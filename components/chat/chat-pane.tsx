"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import ChatBubble from "./chat-bubble";
import { ChatMessage, ChatRoom } from "@/types/chat.type";
import { Admin } from "@/types/admin.type";
import socket from "@/lib/socket";
import { refetchChatMessage } from "@/action/chat-message.action";
import { formatDate, isDifferentDay } from "@/utils/date";
import ChatDate from "./chat-date";
type Props = {
  chatMessages: ChatMessage[] | null;
  admin: Admin;
  room: ChatRoom;
};
export default function ChatPane({ room, chatMessages, admin }: Props) {
  const handleUpdateChatRoom = async () => {
    await refetchChatMessage(room.id);
  };
  useEffect(() => {
    socket.on(`chat-room:${room.id}`, handleUpdateChatRoom);
    return () => {
      socket.off(`chat-room:${room.id}`, handleUpdateChatRoom);
    };
  });

  return (
    <div className="no-scrollbar flex h-[calc(100%-90px)] flex-col-reverse gap-2 overflow-y-auto p-3">
      {chatMessages &&
        chatMessages.map((message, index) => {
          const currentDate = new Date(message.created_at);
          const previousMessage = chatMessages[index + 1]; // Remember, the array is reversed
          const showDateBadge =
            !previousMessage ||
            isDifferentDay(currentDate, new Date(previousMessage.created_at));

          return (
            <React.Fragment key={message.id}>
              <ChatBubble
                isMe={message.chat_member.admin_id === admin.id}
                message={message}
              />
              {showDateBadge && <ChatDate date={message.created_at} />}
            </React.Fragment>
          );
        })}
    </div>
  );
}
