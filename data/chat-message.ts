import { PaginateResult } from "@/types/base.type";
import {
  ChatMessage,
  ChatMessageFilter,
  CreateChatMessage,
} from "@/types/chat.type";
import { fetchApi } from "@/utils/fetch-client";
import { toQueryString } from "@/utils/string";
const getAdminPath = () => {
  return "/admin/chat-message";
};
const getPath = () => {
  return "/chat-message";
};

export const sendMessage = async (
  payload: CreateChatMessage,
  isAdmin: boolean,
) => {
  const endpoint = isAdmin ? getAdminPath() : getPath();
  const data = await fetchApi.post<ChatMessage>(`${endpoint}`, payload, [
    `chat-message:${payload.chat_room_id}`,
  ]);
  return data;
};

export const paginateMessagesByRoomID = async (
  roomId: string,
  filter: ChatMessageFilter,
  isAdmin: boolean,
) => {
  //TODO: Add Filter Later
  const endpoint = isAdmin ? getAdminPath() : getPath();
  const fullUrl = `${endpoint}/${roomId}${toQueryString({ ...filter })}`;
  const { data, error } = await fetchApi.get<PaginateResult<ChatMessage[]>>(
    fullUrl,
    [`chat-message:${roomId}`],
  );

  return { data: data?.data, page: data?.metadata.page, error };
};
