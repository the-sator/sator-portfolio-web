import { cn } from "@/lib/utils";
import { ChatMessage } from "@/types/chat.type";
import { renderMessage } from "@/utils/render-message";
import React from "react";
import ImageContainerBlurClient from "../ui/image/image-container-blur-client";
import { formatTime } from "@/utils/date";
import { ChatMessageType } from "@/enum/chat.enum";
type Props = {
  isMe?: boolean;
  message: ChatMessage;
};
export default function ChatBubble({ isMe = true, message }: Props) {
  if (message.message_type === ChatMessageType.TEXT) {
    return (
      <div className={cn("flex", isMe && "justify-end")}>
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
          <p className={cn("mt-2 flex justify-end text-xs italic")}>
            {formatTime(message.created_at)}
          </p>
        </div>
      </div>
    );
  }

  if (message.message_type === ChatMessageType.IMAGE) {
    return (
      <div className={cn("flex", isMe && "justify-end")}>
        <div
          className={cn(
            "relative h-fit min-w-[10%] max-w-[60%] rounded-lg bg-primary px-4 py-1.5 text-sm text-background",
            "px-1",
            isMe && "bg-blue-500 text-white",
          )}
        >
          {!isMe && (
            <p
              className="px-2 text-xs font-bold"
              style={{ marginBottom: "0.3rem" }}
            >
              {message.chat_member.admin
                ? message.chat_member.admin.username
                : message.chat_member.user?.username}
            </p>
          )}
          <div className={cn("mb-2 flex flex-wrap gap-1")}>
            {message.media!.map((image) => (
              <ImageContainerBlurClient
                src={image}
                key={image}
                className={cn("overflow-hidden rounded-sm")}
              />
            ))}
          </div>
          <div className="px-2">
            <p>{message.content}</p>
            <p className={cn("mt-2 flex justify-end text-xs italic")}>
              {formatTime(message.created_at)}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (
    message.message_type === ChatMessageType.LEAVE ||
    message.message_type === ChatMessageType.JOIN ||
    message.message_type === ChatMessageType.INVITE
  ) {
    return (
      <div className={cn("flex w-full", "justify-center")}>
        <span className="rounded-full bg-background px-3 py-1 text-xs text-foreground">
          {message.content}
        </span>
      </div>
    );
  }
}
