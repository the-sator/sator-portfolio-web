import { ChatRoom } from "@/types/chat.type";
import { fetchApi } from "@/utils/fetch-client";
const getAdminPath = () => {
  return `/admin/chat-room`;
};
const getPath = () => {
  return `/chat-room`;
};
/* ADMIN */
export const getAllRooms = async () => {
  const data = await fetchApi.get<ChatRoom[]>(`${getAdminPath()}`, [
    "chat-room",
  ]);
  return data;
};

export const getById = async (id: string) => {
  const data = await fetchApi.get<ChatRoom>(`${getAdminPath()}/${id}`, [
    `chat-room:${id}`,
  ]);
  return data;
};

/* USER */
export const getUserChatRoom = async () => {
  const data = await fetchApi.get<ChatRoom[]>(`${getPath()}/user`, [
    "chat-room",
  ]);
  console.log("data:", data);
  return data;
};
