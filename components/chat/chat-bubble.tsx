import { cn } from "@/lib/utils";
import { ChatMessage } from "@/types/chat.type";
import { formatTime } from "@/utils/date";
import { RenderMessage } from "@/utils/render-message";
import React from "react";
type Props = {
  isMe?: boolean;
  message: ChatMessage;
};
export default function ChatBubble({ isMe = true, message }: Props) {
  // const blue = "bg-blue-500 text-white";
  return (
    <div className={cn("flex w-full", isMe && "justify-end")}>
      <RenderMessage message={message} isMe={isMe} />
    </div>
  );
}
