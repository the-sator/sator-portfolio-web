import { markAsReadAction } from "@/action/unread-message.action";
import { toast } from "@/hooks/use-toast";
import { UnreadMessage } from "@/types/chat.type";
import { create } from "zustand";

type UnreadCount = {
  chat_room_id: string;
  total_count: number;
};

type UnreadMessageStore = {
  unread_counts: UnreadCount[];
  setUnreadCounts: (chat_room_id: string, count: number) => void;
  // markAsRead: (roomId: string, isAdmin: boolean) => Promise<void>;
};

export const useUnreadMessage = create<UnreadMessageStore>((set, get) => ({
  unread_counts: [],
  setUnreadCounts: (chat_room_id: string, count: number) =>
    set((state) => {
      const updatedUnreads = state.unread_counts.filter(
        (u) => u.chat_room_id !== chat_room_id,
      );
      updatedUnreads.push({ chat_room_id, total_count: count });
      return { unread_counts: updatedUnreads };
    }),
}));
