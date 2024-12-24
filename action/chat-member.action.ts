"use server";
import { revalidatePath, revalidateTag } from "next/cache";
import {
  getAllInvitableChatMember,
  inviteChatMember,
  joinChatRoom,
  leave,
  removeChatMember,
} from "@/data/chat-member";
import { CreateChatMember, InviteChatMember } from "@/types/chat.type";

export const joinAction = async (payload: CreateChatMember) => {
  const { data, error } = await joinChatRoom(payload);
  if (error) {
    return { data: null, error };
  }
  revalidateTag(`chat-message:${payload.chat_room_id}`);
  revalidateTag(`chat-room`);
  revalidateTag(`chat-member`);
  revalidatePath(`/`);

  return { data, error };
};

export const inviteAction = async (payload: InviteChatMember) => {
  const { data, error } = await inviteChatMember(payload);
  if (error) {
    return { data: null, error };
  }
  revalidateTag(`chat-message:${payload.chat_room_id}`);
  revalidateTag(`chat-room:${payload.chat_room_id}`);
  revalidateTag(`chat-member`);
  return { data, error };
};

export const getAllInvitableChatMemberAction = async () => {
  const { data, error } = await getAllInvitableChatMember();
  if (error) {
    return { data: null, error };
  }
  return { data, error };
};

//pass room id to revalidate
export const removeChatMemberAction = async (id: string, roomId: string) => {
  const { data, error } = await removeChatMember(id);
  if (error) {
    return { data: null, error };
  }
  revalidateTag(`chat-room:${roomId}`);
  revalidateTag(`chat-member`);
  return { data, error };
};

export const leaveAction = async (roomId: string) => {
  const { data, error } = await leave(roomId);
  if (error) {
    return { data: null, error };
  }
  revalidateTag(`chat-room:${roomId}`);
  revalidateTag(`chat-room`);
  revalidateTag(`chat-member`);
  return { data, error };
};
