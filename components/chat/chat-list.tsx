"use client";
import React, { useEffect, useState } from "react";
import ChatItem from "./chat-item";
import { ChatRoom } from "@/types/chat.type";
import socket from "@/lib/socket";
import { WSEvent } from "@/enum/ws-event.enum";
type Props = {
  rooms: ChatRoom[];
  isAdmin: boolean;
};
export default function ChatList({ rooms, isAdmin }: Props) {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>(rooms);
  const handleUpdateChatRoom = (room: ChatRoom) => {
    setChatRooms((prev) => {
      // Find by Index. If exist replace then sort
      // Else just add new one and sort
      const existingRoomIndex = prev.findIndex((prev) => prev.id === room.id);
      if (existingRoomIndex !== -1) {
        const updatedRooms = [...prev];
        updatedRooms[existingRoomIndex] = room;
        return updatedRooms.sort(
          (a, b) =>
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
        );
      }
      return [...prev, room].sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
      );
    });
  };

  useEffect(() => {
    socket.on(WSEvent.ADMIN_UPDATE_ROOM, handleUpdateChatRoom);
    return () => {
      socket.off(WSEvent.ADMIN_UPDATE_ROOM, handleUpdateChatRoom);
    };
  });
  return (
    <div>
      <div className="grid grid-cols-1 gap-2">
        {chatRooms.map((room) => (
          <ChatItem key={room.id} room={room} isAdmin={isAdmin} />
        ))}
      </div>
    </div>
  );
}
