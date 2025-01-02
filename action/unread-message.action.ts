"use server";

import { getByAuthId, markAsRead } from "@/data/unread-message";
import { revalidateTag } from "next/cache";

export async function getByAuthIdAction(isAdmin: boolean) {
  const { data, error } = await getByAuthId(isAdmin);
  if (error) {
    return { data: null, error };
  }
  return { data, error };
}

export async function markAsReadAction(
  id: string,
  roomId: string,
  isAdmin: boolean,
) {
  const { data, error } = await markAsRead(id, isAdmin);
  if (error) {
    return { data: null, error };
  }
  revalidateTag(`chat-room:${roomId}`);
  return { data, error };
}
