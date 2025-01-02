import { UnreadMessage } from "@/types/chat.type";
import { fetchApi } from "@/utils/fetch-client";

function getPath() {
  return `/unread`;
}
function getAdminPath() {
  return `/admin/unread`;
}

export async function getByAuthId(isAdmin: boolean) {
  const endpoint = isAdmin ? getAdminPath() : getPath();
  const data = await fetchApi.get<UnreadMessage[]>(`${endpoint}`);
  return data;
}
export async function markAsRead(id: string, isAdmin: boolean) {
  const endpoint = isAdmin ? getAdminPath() : getPath();
  const data = await fetchApi.post<UnreadMessage>(`${endpoint}/${id}`);
  return data;
}
