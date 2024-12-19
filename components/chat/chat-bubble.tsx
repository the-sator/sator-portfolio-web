import { cn } from "@/lib/utils";
import { ChatMessage } from "@/types/chat.type";
import { formatTime } from "@/utils/date";
import React from "react";
type Props = {
  isMe?: boolean;
  message: ChatMessage;
};
export default function ChatBubble({ isMe = true, message }: Props) {
  return (
    <div className={cn("flex w-full", isMe && "justify-end")}>
      <div
        className={cn(
          "relative h-fit min-w-[10%] max-w-[60%] rounded-lg bg-primary px-4 py-1.5 text-sm text-background",
          isMe && "bg-blue-500 text-white",
        )}
      >
        {!isMe && (
          <p className="text-xs font-bold">
            {message.chat_member.admin
              ? message.chat_member.admin.username
              : message.chat_member.user?.username}
          </p>
        )}
        <p>{message.content}</p>
        <p className={cn("mt-2 text-right text-xs italic")}>
          {formatTime(message.created_at)}
        </p>
      </div>
    </div>
  );
}
