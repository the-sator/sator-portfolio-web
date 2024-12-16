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
          "h-fit w-fit rounded-lg bg-primary px-4 py-1.5 text-sm text-background",
          isMe && "bg-blue-500 text-white",
        )}
      >
        {!isMe && (
          <p className="text-xs font-bold">
            {message.chat_member.admin?.username}
          </p>
        )}
        <div className="flex gap-2">
          <p>{message.content}</p>
          <p className="relative top-1.5 text-xs italic">
            {formatTime(message.created_at)}
          </p>
        </div>
      </div>
      <div></div>
    </div>
  );
}
