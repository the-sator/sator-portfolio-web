"use server";

import { markAsRead } from "@/data/unread-message";
import { revalidateTag } from "next/cache";

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
