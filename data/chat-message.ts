import { ChatMessage, CreateChatMessage } from "@/types/chat.type";
import { fetchApi } from "@/utils/fetch-client";
const getPath = () => {
  return "/admin/chat-message";
};

export const getMessagesByRoomID = async (roomId: string) => {
  const data = await fetchApi.get<ChatMessage[]>(`${getPath()}/${roomId}`, [
    `chat-message:${roomId}`,
  ]);
  return data;
};

export const sendMessage = async (payload: CreateChatMessage) => {
  const data = await fetchApi.post<ChatMessage>(`${getPath()}`, payload, [
    `chat-message:${payload.chat_room_id}`,
  ]);
  return data;
};
