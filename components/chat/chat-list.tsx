"use client";
import React, { useEffect, useState } from "react";
import ChatItem from "./chat-item";
import { ChatRoom, ChatRoomFilter } from "@/types/chat.type";
import socket from "@/lib/socket";
import { WSEventType, WSReceiver } from "@/enum/ws-event.enum";
import { useSearchParams } from "next/navigation";
import { useGetInfiniteChatRoom } from "@/data/query/chat-room";
import { toast } from "@/hooks/use-toast";
import Spinner from "../ui/spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { Auth } from "@/types/auth.type";
import { WSPayload } from "@/types/base.type";
type Props = {
  isAdmin: boolean;
  auth: Partial<Auth>;
};
export default function ChatList({ isAdmin, auth }: Props) {
  const searchParams = useSearchParams();
  const filter: ChatRoomFilter = Object.fromEntries(
    searchParams.entries(),
  ) as unknown as ChatRoomFilter;
  const {
    data,
    error,
    isError,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useGetInfiniteChatRoom(filter as ChatRoomFilter, isAdmin, {});
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [newRooms, setNewRooms] = useState<ChatRoom[]>([]);

  const handleUpdateChatRoom = (payload: WSPayload<ChatRoom>) => {
    switch (payload.type) {
      case WSEventType.UPDATE_ROOM:
        setNewRooms((prev) => {
          // Find by Index. If exist replace then sort
          // Else just add new one and sort
          const existingRoomIndex = prev.findIndex(
            (prev) => prev.id === payload.data.id,
          );
          if (existingRoomIndex !== -1) {
            const updatedRooms = [...prev];
            updatedRooms[existingRoomIndex] = payload.data;
            return updatedRooms.sort(
              (a, b) =>
                new Date(b.updated_at).getTime() -
                new Date(a.updated_at).getTime(),
            );
          }
          return [...prev, payload.data].sort(
            (a, b) =>
              new Date(b.updated_at).getTime() -
              new Date(a.updated_at).getTime(),
          );
        });
        return;
      case WSEventType.CHAT_ROOM_CREATED:
        setNewRooms((prev) => {
          return [...prev, payload.data].sort(
            (a, b) =>
              new Date(b.updated_at).getTime() -
              new Date(a.updated_at).getTime(),
          );
        });
    }
  };

  useEffect(() => {
    if (isError) {
      toast({
        title: "Error Fetching Portfolio",
        description: error.message,
        variant: "destructive",
      });
    }

    if (data) {
      const allRooms = data.pages.flatMap((page) => page.data || []);
      const mergeRooms = [...newRooms, ...allRooms].reduce((acc, message) => {
        if (!acc.find((m) => m.id === message.id)) {
          acc.push(message);
        }
        return acc;
      }, [] as ChatRoom[]);
      setChatRooms(mergeRooms);
    }
  }, [data, isError, newRooms]);

  useEffect(() => {
    socket.on(`${WSReceiver.MEMBER}:${auth.id}`, handleUpdateChatRoom);
    return () => {
      socket.off(`${WSReceiver.MEMBER}:${auth.id}`, handleUpdateChatRoom);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Spinner className="animate-spin" />
      </div>
    );
  }

  return (
    <div
      className="no-scrollbar h-[calc(100svh-140px)] overflow-y-auto"
      id="scroll-container"
    >
      <InfiniteScroll
        className="no-scrollbar flex h-full flex-col gap-2"
        dataLength={chatRooms.length}
        next={fetchNextPage}
        scrollableTarget="scroll-container"
        hasMore={hasNextPage || isFetchingNextPage}
        loader={
          <div className="flex justify-center">
            <Spinner />
          </div>
        }
      >
        {/* <div className="grid grid-cols-1 gap-2"> */}
        {chatRooms.map((room) => (
          <ChatItem key={room.id} room={room} isAdmin={isAdmin} />
        ))}
        {/* </div> */}
      </InfiniteScroll>
    </div>
  );
}
