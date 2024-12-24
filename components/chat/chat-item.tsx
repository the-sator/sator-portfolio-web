"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ChatRoom } from "@/types/chat.type";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { formatTime } from "@/utils/date";
type Props = {
  room: ChatRoom;
  isAdmin?: boolean;
};
export default function ChatItem({ room, isAdmin = false }: Props) {
  const params = useParams();
  const time = new Date(room.updated_at);

  return (
    <Link href={isAdmin ? `/admin-panel/chat/${room.id}` : `/chat/${room.id}`}>
      <div
        className={cn(
          "flex w-full justify-between rounded-md px-1 py-2 hover:cursor-pointer hover:bg-popover",
          params.id === room.id && "bg-popover",
        )}
      >
        <div className="flex items-center gap-2">
          <Avatar className="size-11">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">{room.name}</h2>
            <p className="text-sm text-label">How are you doing?</p>
          </div>
        </div>
        <div className="justify-end">
          <p className="text-sm text-label">
            {time.toLocaleTimeString("en-us", { timeStyle: "short" })}
          </p>
        </div>
      </div>
    </Link>
  );
}
