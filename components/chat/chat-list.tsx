import React from "react";
import { Input } from "../ui/input";
import ChatItem from "./chat-item";
import { ChatMessage, ChatRoom } from "@/types/chat.type";
type Props = {
  rooms: ChatRoom[];
  activeRoomId?: string;
  isAdmin: boolean;
};
export default function ChatList({ rooms, activeRoomId, isAdmin }: Props) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4">
        {rooms.map((room) => (
          <ChatItem
            key={room.id}
            room={room}
            activeRoomId={activeRoomId}
            isAdmin={isAdmin}
          />
        ))}
      </div>
    </div>
  );
}
