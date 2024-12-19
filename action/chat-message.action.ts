"use server";

import { paginateMessagesByRoomID, sendMessage } from "@/data/chat-message";
import { ChatMessageFilter, CreateChatMessage } from "@/types/chat.type";
import { revalidateTag } from "next/cache";

export const sendMessageAction = async (payload: CreateChatMessage) => {
  const { data, error } = await sendMessage(payload);
  if (error) {
    return { data: null, error };
  }
  return { data, error };
};

export const refetchChatMessage = async (roomId: string) => {
  revalidateTag(`chat-message:${roomId}`);
  revalidateTag(`chat-room`);
};

export const paginateMessageByRoomIDAction = async (
  roomId: string,
  filter: ChatMessageFilter,
  isAdmin: boolean,
) => {
  const { data, page } = await paginateMessagesByRoomID(
    roomId,
    filter,
    isAdmin,
  );

  return { data, page };
};
