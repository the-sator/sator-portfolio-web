import { PaginateResult } from "@/types/base.type";
import {
  ChangeChatRoomName,
  ChatRoom,
  ChatRoomFilter,
  CreateChatRoom,
} from "@/types/chat.type";
import { fetchApi } from "@/utils/fetch-client";
import { toQueryString } from "@/utils/string";
const getAdminPath = () => {
  return `/admin/chat-room`;
};
const getPath = () => {
  return `/chat-room`;
};
/* ADMIN */
export const getAllRooms = async (filter?: ChatRoomFilter) => {
  const fullUrl = `${getAdminPath()}${toQueryString({ ...filter })}`;
  const data = await fetchApi.get<ChatRoom[]>(fullUrl, ["chat-room"]);
  return data;
};

export const getById = async (id: string, isAdmin = false) => {
  const endpoint = isAdmin ? `${getAdminPath()}/${id}` : `${getPath()}/${id}`;
  const { data, error } = await fetchApi.get<ChatRoom>(`${endpoint}`, [
    `chat-room:${id}`,
  ]);
  return { data, error };
};

export const paginateChatRoom = async (
  filter: ChatRoomFilter,
  isAdmin = false,
) => {
  const endpoint = isAdmin ? `${getAdminPath()}` : `${getPath()}/user`;
  const fullUrl = `${endpoint}${toQueryString({ ...filter })}`;
  const { data, error } = await fetchApi.get<PaginateResult<ChatRoom[]>>(
    fullUrl,
    [`chat-room`],
  );

  return { data: data?.data, page: data?.metadata.page, error };
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
