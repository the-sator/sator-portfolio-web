"use client";
import React from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { ChatRoom } from "@/types/chat.type";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { ChatMessageType } from "@/enum/chat.enum";
import { Auth } from "@/types/auth.type";
type Props = {
  room: ChatRoom;
  isAdmin?: boolean;
  auth?: Partial<Auth>;
};
export default function ChatItem({ room, auth, isAdmin = false }: Props) {
  const params = useParams();
  const time = new Date(room.updated_at);
  const isUnread =
    room.last_message?.unread && room.last_message.unread.length > 0
      ? room.last_message.unread.includes(auth!.id!)
      : false;
  const last_message_username = (() => {
    if (
      room.last_message?.message_type === ChatMessageType.IMAGE ||
      room.last_message?.message_type === ChatMessageType.TEXT
    ) {
      return `${
        room.last_message
          ? room.last_message.chat_member.user
            ? room.last_message.chat_member.user.username
            : room.last_message.chat_member.admin!.username
          : ""
      }: `;
    }
    return "";
  })();

  const last_message_content = (() => {
    if (!room.last_message) return "";
    switch (room.last_message.message_type) {
      case ChatMessageType.IMAGE:
        return "Photo";
      default:
        return room.last_message.content;
    }
  })();

  return (
    <Link href={isAdmin ? `/admin-panel/chat/${room.id}` : `/chat/${room.id}`}>
      <div
        className={cn(
          "relative flex w-full justify-between rounded-md px-2 py-2 hover:cursor-pointer hover:bg-popover",
          params.id === room.id && "bg-popover",
        )}
      >
        <div className="flex items-center gap-3">
          <Avatar className="size-11">
            {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
            <AvatarFallback className="bg-primary text-xs text-background">
              {room.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="line-clamp-1 font-semibold">{room.name}</h2>
            <p
              className={cn(
                "line-clamp-1 text-sm text-label",
                isUnread && "font-bold",
              )}
            >
              {room.last_message &&
                `${last_message_username}${last_message_content}`}
            </p>
          </div>
        </div>
        <div className="justify-end">
          <p className="text-xs text-label md:text-sm">
            {time.toLocaleTimeString("en-us", { timeStyle: "short" })}
          </p>
        </div>
        {isUnread && (
          <div className="absolute right-2 top-[60%] size-2 -translate-y-1/2 animate-pulse rounded-full bg-blue-500" />
        )}
      </div>
    </Link>
  );
}
