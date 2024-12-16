import { ChatRoom } from "@/types/chat.type";
import { fetchApi } from "@/utils/fetch-client";

export const getAllRooms = async () => {
  const data = await fetchApi.get<ChatRoom[]>("/admin/chat-room", [
    "chat-room",
  ]);
  return data;
};

export const getById = async (id: string) => {
  const data = await fetchApi.get<ChatRoom>(`/admin/chat-room/${id}`, [
    `chat-room:${id}`,
  ]);
  return data;
};
