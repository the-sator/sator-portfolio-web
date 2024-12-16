"use server";

import { sendMessage } from "@/data/chat-message";
import { CreateChatMember, CreateChatMessage } from "@/types/chat.type";
import { revalidateTag } from "next/cache";

export const sendMessageAction = async (payload: CreateChatMessage) => {
  const { data, error } = await sendMessage(payload);
  if (error) {
    return { data: null, error };
  }
  revalidateTag(`chat-message:${payload.chat_room_id}`);
  revalidateTag(`chat-room`);
  return { data, error };
};

export const refetchChatMessage = async (roomId: string) => {
  revalidateTag(`chat-message:${roomId}`);
  revalidateTag(`chat-room`);
};
