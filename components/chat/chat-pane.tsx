"use client";
import React, { useEffect, useState } from "react";
import ChatBubble from "./chat-bubble";
import { ChatMessage, ChatMessageFilter, ChatRoom } from "@/types/chat.type";
import { Admin } from "@/types/admin.type";
import socket from "@/lib/socket";
import { isDifferentDay } from "@/utils/date";
import ChatDate from "./chat-date";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetInfiniteAdminChat } from "@/data/query/admin-chat";
import { toast } from "@/hooks/use-toast";
import Spinner from "../ui/spinner";
import { Auth } from "@/types/auth.type";
type Props = {
  auth: Partial<Auth>;
  room: ChatRoom;
  filter: ChatMessageFilter;
  isAdmin?: boolean;
};
export default function ChatPane({
  room,
  filter,
  auth,
  isAdmin = false,
}: Props) {
  const {
    data,
    error,
    isError,
    refetch,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useGetInfiniteAdminChat(room.id, filter, isAdmin, {});
  const handleUpdateChatRoom = async () => {
    await refetch();
  };
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  useEffect(() => {
    if (isError) {
      toast({
        title: "Error Fetching Portfolio",
        description: error.message,
        variant: "destructive",
      });
    }

    if (data) {
      console.log("data:", data);
      const allMessages = data.pages.flatMap((page) => page.data || []);
      setChatMessages(allMessages);
    }
  }, [data, isError]);

  useEffect(() => {
    socket.on(`chat-room:${room.id}`, handleUpdateChatRoom);
    return () => {
      socket.off(`chat-room:${room.id}`, handleUpdateChatRoom);
    };
  });

  return (
    <div
      className="flex h-[calc(100%-90px)] w-full flex-col-reverse gap-4 overflow-auto px-4 py-3"
      id="scroll-container"
    >
      {isLoading && (
        <div className="flex flex-1 items-center justify-center">
          <Spinner className="animate-spin" />
        </div>
      )}

      <InfiniteScroll
        className="flex h-full flex-col-reverse gap-4"
        dataLength={chatMessages.length}
        next={fetchNextPage}
        inverse={true}
        scrollableTarget="scroll-container"
        hasMore={hasNextPage || isFetchingNextPage}
        loader={
          <div className="flex justify-center">
            <Spinner />
          </div>
        }
      >
        {chatMessages &&
          chatMessages.map((message, index) => {
            const currentDate = new Date(message.created_at);
            const previousMessage = chatMessages[index + 1]; // Remember, the array is reversed
            const showDateBadge =
              !previousMessage ||
              isDifferentDay(currentDate, new Date(previousMessage.created_at));

            return (
              <React.Fragment key={message.id}>
                <ChatBubble
                  isMe={
                    message.chat_member.admin_id === auth.id ||
                    message.chat_member.user_id === auth.id
                  }
                  message={message}
                />
                {showDateBadge && <ChatDate date={message.created_at} />}
              </React.Fragment>
            );
          })}
      </InfiniteScroll>
    </div>
  );
}
