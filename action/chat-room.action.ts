"use server";
import { changeChatRoomName, createChatRoom } from "@/data/chat-room";
import {
  ChangeChatRoomName,
  CreateChatRoom,
  CreateChatRoomSchema,
} from "@/types/chat.type";
import { revalidateTag } from "next/cache";

export const createChatRoomAction = async (formData: unknown) => {
  const result = CreateChatRoomSchema.safeParse(formData);
  if (result.error) {
    return { error: result.error.format() };
  }
  const data: CreateChatRoom = {
    name: result.data.name,
    chat_members: result.data.chat_members,
    is_group: result.data.is_group,
  };
  const { error } = await createChatRoom(data);
  if (error) {
    return { error };
  }
  revalidateTag("chat-room");
  return { error };
};

export const changeChatRoomNameAction = async (
  id: string,
  formData: unknown,
) => {
  const result = CreateChatRoomSchema.safeParse(formData);
  if (result.error) {
    return { error: result.error.format() };
  }
  const data: ChangeChatRoomName = {
    name: result.data.name,
  };
  const { error } = await changeChatRoomName(id, data);
  if (error) {
    return { error };
  }
  revalidateTag("chat-room");
  revalidateTag(`chat-room:${id}`);
  return { error };
};
