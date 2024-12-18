import { PaginateResult } from "@/types/base.type";
import {
  ChatMessage,
  ChatMessageFilter,
  CreateChatMessage,
} from "@/types/chat.type";
import { fetchApi } from "@/utils/fetch-client";
import { toQueryString } from "@/utils/string";
const getPath = () => {
  return "/admin/chat-message";
};

// export const getMessagesByRoomID = async (roomId: string) => {
//   const data = await fetchApi.get<ChatMessage[]>(`${getPath()}/${roomId}`, [
//     `chat-message:${roomId}`,
//   ]);
//   return data;
// };

export const sendMessage = async (payload: CreateChatMessage) => {
  const data = await fetchApi.post<ChatMessage>(`${getPath()}`, payload, [
    `chat-message:${payload.chat_room_id}`,
  ]);
  return data;
};

export const paginateMessagesByRoomID = async (
  roomId: string,
  filter: ChatMessageFilter,
) => {
  //TODO: Add Filter Later
  const fullUrl = `${getPath()}/${roomId}${toQueryString({ ...filter })}`;
  const { data, error } = await fetchApi.get<PaginateResult<ChatMessage[]>>(
    fullUrl,
    [`chat-message:${roomId}`],
  );

  return { data: data?.data, page: data?.metadata.page, error };
};
