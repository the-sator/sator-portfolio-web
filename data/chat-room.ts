import {
  ChangeChatRoomName,
  ChatRoom,
  CreateChatRoom,
} from "@/types/chat.type";
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

export const adminGetById = async (id: string) => {
  const { data, error } = await fetchApi.get<ChatRoom>(
    `${getAdminPath()}/${id}`,
    [`chat-room:${id}`],
  );
  return { data, error };
};

export const createChatRoom = async (payload: CreateChatRoom) => {
  const { data, error } = await fetchApi.post<ChatRoom>(
    `${getAdminPath()}`,
    payload,
    [`chat-room`],
  );
  return { data, error };
};

export const changeChatRoomName = async (
  id: string,
  payload: ChangeChatRoomName,
) => {
  const { data, error } = await fetchApi.post<ChatRoom>(
    `${getAdminPath()}/${id}/change-name`,
    payload,
    [`chat-room:${id}`],
  );
  return { data, error };
};

/* USER */
export const getUserChatRoom = async () => {
  const data = await fetchApi.get<ChatRoom[]>(`${getPath()}/user`, [
    "chat-room",
  ]);
  return data;
};

export const getById = async (id: string) => {
  const { data, error } = await fetchApi.get<ChatRoom>(`${getPath()}/${id}`, [
    `chat-room:${id}`,
  ]);
  return { data, error };
};
