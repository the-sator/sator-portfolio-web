import { cn } from "@/lib/utils";
import { ChatMessage } from "@/types/chat.type";
import { renderMessage } from "@/utils/render-message";
import React from "react";
type Props = {
  isMe?: boolean;
  message: ChatMessage;
};
export default function ChatBubble({ isMe = true, message }: Props) {
  // const blue = "bg-blue-500 text-white";

  return (
    <div className={cn("flex", isMe && "justify-end")}>
      {renderMessage({ message, isMe })}
    </div>
  );
}
