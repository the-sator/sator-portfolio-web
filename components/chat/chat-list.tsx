"use client";
import React, { useEffect, useRef, useState } from "react";
import ChatItem from "./chat-item";
import { ChatRoom, ChatRoomFilter } from "@/types/chat.type";
import { WSEventType, WSReceiver } from "@/enum/ws-event.enum";
import { useParams, useSearchParams } from "next/navigation";
import { useGetInfiniteChatRoom } from "@/data/query/chat-room";
import { toast } from "@/hooks/use-toast";
import Spinner from "../ui/spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { WSPayload } from "@/types/base.type";
import { getSocket } from "@/lib/socket";
import { useUnreadMessage } from "@/store/unread-message";
import { Admin } from "@/types/admin.type";
import { User } from "@/types/user.type";
type Props = {
  isAdmin: boolean;
  auth: Admin | User;
};
export default function ChatList({ isAdmin, auth }: Props) {
  const searchParams = useSearchParams();
  const params = useParams();
  const paramsRef = useRef(params.id); // Create a ref to store params.id
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [newRooms, setNewRooms] = useState<ChatRoom[]>([]);
  const { setUnreadCounts } = useUnreadMessage();
  const filter: ChatRoomFilter = Object.fromEntries(
    searchParams.entries(),
  ) as unknown as ChatRoomFilter;
  const socket = getSocket();
  const {
    data,
    error,
    isError,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useGetInfiniteChatRoom(filter as ChatRoomFilter, isAdmin, {});
  useEffect(() => {
    paramsRef.current = params.id;
  }, [params.id]);
  console.log("auth.id:", auth.id);
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
        if (payload.data.id === paramsRef.current) return;
        const unreadMessageCount =
          payload.data.unread_messages.find(
            (message) =>
              message.chat_member.admin_id === auth?.id ||
              message.chat_member.user_id === auth?.id,
          )?.total_count || 0;
        setUnreadCounts(payload.data.id, unreadMessageCount);
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
      {chatRooms.length > 0 ? (
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
            <ChatItem key={room.id} room={room} isAdmin={isAdmin} auth={auth} />
          ))}
          {/* </div> */}
        </InfiniteScroll>
      ) : (
        <div className="flex justify-center">
          <p className="text-sm text-label">
            Click on + to create new chat room
          </p>
        </div>
      )}
    </div>
  );
}
