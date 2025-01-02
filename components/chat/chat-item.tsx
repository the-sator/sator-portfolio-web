"use client";
import React, { useEffect } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { ChatRoom } from "@/types/chat.type";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { ChatMessageType } from "@/enum/chat.enum";
import { Auth } from "@/types/auth.type";
import { useUnreadMessage } from "@/store/unread-message";
import Indicator from "../ui/indicator";
type Props = {
  room: ChatRoom;
  isAdmin?: boolean;
  auth?: Partial<Auth>;
};
export default function ChatItem({ room, auth, isAdmin = false }: Props) {
  const params = useParams();
  const time = new Date(room.updated_at);
  const { unread_counts, setUnreadCounts } = useUnreadMessage();
  const unread = unread_counts.find((u) => u.chat_room_id === room.id);
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

  useEffect(() => {
    const unreadCount =
      room.unread_messages.find(
        (message) =>
          message.chat_member.admin_id === auth?.id ||
          message.chat_member.user_id === auth?.id,
      )?.total_count || 0;
    setUnreadCounts(room.id, unreadCount);
  }, []);

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
                unread &&
                  unread.total_count > 0 &&
                  unread.chat_room_id === room.id &&
                  "font-bold",
              )}
            >
              {room.last_message &&
                `${last_message_username}${last_message_content}`}
            </p>
          </div>
        </div>
        <div className="justify-end">
          <p className="text-nowrap text-[10px] text-label">
            {time.toLocaleTimeString("en-us", { timeStyle: "short" })}
          </p>
        </div>
        {unread &&
          unread.total_count > 0 &&
          unread.chat_room_id === room.id && (
            // <div className="absolute right-2 top-[65%] flex size-4 -translate-y-1/2 animate-pulse items-center justify-center rounded-full bg-blue-500">
            //   <p className="text-[10px] text-background">
            //     {unread.total_count}
            //   </p>
            // </div>
            <Indicator
              count={unread.total_count}
              className="absolute right-2 top-[65%] -translate-y-1/2"
            />
          )}
      </div>
    </Link>
  );
}
