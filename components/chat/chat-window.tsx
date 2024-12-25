import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ChatPane from "./chat-pane";
import {
  ChatMessageFilter,
  ChatRoom,
  InvitableChatMember,
} from "@/types/chat.type";
import ChatInput from "./chat-input";
import { Auth } from "@/types/auth.type";
import ChatWindowDropdown from "../ui/dropdown/chat-window-dropdown";
type Props = {
  auth: Partial<Auth>;
  room: ChatRoom;
  filter: ChatMessageFilter;
  members?: InvitableChatMember | null;
  isAdmin: boolean;
};
export default async function ChatWindow({
  filter,
  auth,
  room,
  members,
  isAdmin,
}: Props) {
  return (
    <div className="flex h-full flex-col">
      <div className="z-20 flex w-full items-center justify-between bg-primary p-2">
        <div className="flex items-center gap-2">
          <Avatar className="size-8">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="text-background">Jame</p>
        </div>
        <ChatWindowDropdown room={room} member={members} auth={auth} />
      </div>
      <ChatPane filter={filter} room={room} auth={auth} isAdmin={isAdmin} />
      <ChatInput room={room} auth={auth} isAdmin={isAdmin} />
    </div>
  );
}
