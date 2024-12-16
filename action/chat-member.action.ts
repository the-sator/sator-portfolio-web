"use server";
import { revalidateTag } from "next/cache";
import { joinChatRoom } from "@/data/chat-member";
import { CreateChatMember } from "@/types/chat.type";

export const joinAction = async (payload: CreateChatMember) => {
  const { data, error } = await joinChatRoom(payload);
  if (error) {
    return { data: null, error };
  }
  revalidateTag(`chat-message:${payload.chat_room_id}`);
  revalidateTag(`chat-room`);
  return { data, error };
};
