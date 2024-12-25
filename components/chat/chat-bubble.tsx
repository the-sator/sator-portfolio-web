import { cn } from "@/lib/utils";
import { ChatMessage } from "@/types/chat.type";
import { RenderMessage } from "@/utils/render-message";
import React from "react";
type Props = {
  isMe?: boolean;
  message: ChatMessage;
};
export default function ChatBubble({ isMe = true, message }: Props) {
  return (
    <div className={cn("flex", isMe && "justify-end")}>
      <RenderMessage message={message} isMe={isMe} />
    </div>
  );
}
