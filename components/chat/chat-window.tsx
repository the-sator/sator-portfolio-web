import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ChatPane from "./chat-pane";
import { ChatMessageFilter, ChatRoom } from "@/types/chat.type";
import { Admin } from "@/types/admin.type";
import ChatInput from "./chat-input";
type Props = {
  admin: Admin;
  room: ChatRoom;
  filter: ChatMessageFilter;
};
export default function ChatWindow({ filter, admin, room }: Props) {
  return (
    <div className="h-full">
      <div className="z-20 w-full bg-primary p-2">
        <div className="flex items-center gap-2">
          <Avatar className="size-8">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="text-background">Jame</p>
        </div>
      </div>
      <ChatPane filter={filter} room={room} admin={admin} />
      <ChatInput room={room} admin={admin} />
    </div>
  );
}
