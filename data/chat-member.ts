import {
  ChatMember,
  CreateChatMember,
  InvitableChatMember,
  InviteChatMember,
} from "@/types/chat.type";
import { fetchApi } from "@/utils/fetch-client";
export const getAdminPath = () => {
  return `/admin/chat-member`;
};

export const getAllInvitableChatMember = async (roomId?: string) => {
  const url = roomId
    ? `${getAdminPath()}/all/${roomId}`
    : `${getAdminPath()}/all`;
  const data = await fetchApi.get<InvitableChatMember>(url, [`chat-member`]);
  return data;
};

export const joinChatRoom = async (payload: CreateChatMember) => {
  const data = await fetchApi.post<ChatMember>(
    `${getAdminPath()}/join`,
    payload,
    [`chat-member`],
  );
  return data;
};

export const inviteChatMember = async (payload: InviteChatMember) => {
  const data = await fetchApi.post<ChatMember>(
    `${getAdminPath()}/invite`,
    payload,
    [`chat-member`],
  );
  return data;
};

export const leave = async (roomId: string) => {
  const data = await fetchApi.post<ChatMember>(
    `${getAdminPath()}/${roomId}/leave`,
    [`chat-member`],
  );
  return data;
};

export const removeChatMember = async (id: string) => {
  const data = await fetchApi.delete<ChatMember>(`${getAdminPath()}/${id}`, [
    `chat-member`,
  ]);
  return data;
};
