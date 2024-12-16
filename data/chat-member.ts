import { ChatMember, CreateChatMember } from "@/types/chat.type";
import { fetchApi } from "@/utils/fetch-client";
export const getPath = () => {
  return `/admin/chat-member`;
};
export const joinChatRoom = async (payload: CreateChatMember) => {
  const data = await fetchApi.post<ChatMember>(`${getPath()}/join`, payload, [
    `chat-member`,
  ]);
  return data;
};
