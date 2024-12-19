import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ChatPane from "./chat-pane";
import { ChatMessageFilter, ChatRoom } from "@/types/chat.type";
import ChatInput from "./chat-input";
import { Auth } from "@/types/auth.type";
type Props = {
  auth: Partial<Auth>;
  room: ChatRoom;
  filter: ChatMessageFilter;
  isAdmin: boolean;
};
export default function ChatWindow({ filter, auth, room, isAdmin }: Props) {
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
      <ChatPane filter={filter} room={room} auth={auth} isAdmin={isAdmin} />
      <ChatInput room={room} auth={auth} />
    </div>
  );
}
