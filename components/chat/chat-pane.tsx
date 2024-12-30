"use client";
import React, { useEffect, useImperativeHandle, useState } from "react";
import ChatBubble from "./chat-bubble";
import {
  ChatMessage,
  ChatMessageFilter,
  ChatRoom,
  ChatRoomRef,
} from "@/types/chat.type";
import { isDifferentDay } from "@/utils/date";
import ChatDate from "./chat-date";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetInfiniteAdminChat } from "@/data/query/chat-message";
import { toast } from "@/hooks/use-toast";
import Spinner from "../ui/spinner";
import { Auth } from "@/types/auth.type";
import { FaArrowDown } from "react-icons/fa6";
import { Button } from "../ui/button";
import { WSEventType, WSReceiver } from "@/enum/ws-event.enum";
import { WSPayload } from "@/types/base.type";
import { getSocket } from "@/lib/socket";
type Props = {
  auth: Partial<Auth>;
  room: ChatRoom;
  filter: ChatMessageFilter;
  isAdmin?: boolean;
  chatRoomRef: React.RefObject<ChatRoomRef>;
};
export default function ChatPane({
  room,
  filter,
  auth,
  isAdmin = false,
  chatRoomRef,
}: Props) {
  const {
    data,
    error,
    isError,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useGetInfiniteAdminChat(room.id, filter, isAdmin, {});
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessages, setNewMessages] = useState<ChatMessage[]>([]);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const chatPaneRef = React.useRef<HTMLDivElement | null>(null);
  const socket = getSocket();
  // const ownMemberId = room.chat_members.find(
  //   (member) => member.user_id === auth.id || member.admin_id === auth.id,
  // )?.id;

  const handleChatMessage = (payload: WSPayload<ChatMessage>) => {
    if (payload.type === WSEventType.NEW_MESSAGE)
      setNewMessages((prev) => {
        return [payload.data, ...prev];
      });
  };

  const handleScroll = () => {
    if (chatPaneRef.current) {
      const { scrollTop } = chatPaneRef.current;
      setIsAtBottom(scrollTop >= -5);
    }
  };

  const scrollToBottom = () => {
    if (chatPaneRef.current) {
      chatPaneRef.current.scrollTo({
        behavior: "smooth",
        top: chatPaneRef.current.scrollHeight,
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
      const allMessages = data.pages.flatMap((page) => page.data || []);
      const mergedMessages = [...newMessages, ...allMessages].reduce(
        (acc, message) => {
          if (!acc.find((m) => m.id === message.id)) {
            acc.push(message);
          }
          return acc;
        },
        [] as ChatMessage[],
      );
      setChatMessages(mergedMessages);
    }
  }, [data, isError, newMessages]);

  useEffect(() => {
    socket.on(`${WSReceiver.MEMBER}:${auth.id}`, handleChatMessage);
    return () => {
      socket.off(`${WSReceiver.MEMBER}:${auth.id}`, handleChatMessage);
    };
  }, [room.id]);

  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect(() => {
    const chatPane = chatPaneRef.current;
    if (chatPane) {
      chatPane.addEventListener("scroll", handleScroll);
      return () => {
        chatPane.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  useImperativeHandle(chatRoomRef, () => ({
    scrollToBottom,
  }));

  return (
    <div
      ref={chatPaneRef}
      className="relative flex w-full flex-grow flex-col-reverse gap-4 overflow-auto px-4 py-3"
      id="scroll-container"
    >
      <div className="relative bottom-8 z-[100] flex w-full justify-end">
        {!isAtBottom && (
          <Button
            type="button"
            className="fixed size-8 rounded-full p-0 shadow-md"
            onClick={scrollToBottom}
          >
            <FaArrowDown className="text-background" />
          </Button>
        )}
      </div>
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
