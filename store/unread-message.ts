import { getByAuthIdAction } from "@/action/unread-message.action";
import { toast } from "@/hooks/use-toast";
import { create } from "zustand";

type UnreadCount = {
  chat_room_id: string;
  total_count: number;
};

type UnreadMessageStore = {
  unread_counts: UnreadCount[];
  setUnreadCounts: (chat_room_id: string, count: number) => void;
  fetchUnreadCounts: (isAdmin: boolean) => Promise<void>;
  // markAsRead: (roomId: string, isAdmin: boolean) => Promise<void>;
};

export const useUnreadMessage = create<UnreadMessageStore>((set) => ({
  unread_counts: [],
  setUnreadCounts: (chat_room_id: string, count: number) =>
    set((state) => {
      const updatedUnreads = state.unread_counts.filter(
        (u) => u.chat_room_id !== chat_room_id,
      );
      updatedUnreads.push({ chat_room_id, total_count: count });
      return { unread_counts: updatedUnreads };
    }),

  fetchUnreadCounts: async (isAdmin: boolean) => {
    try {
      const { data, error } = await getByAuthIdAction(isAdmin);
      if (error) {
        toast({
          title: "Failed to fetch unread messages",
          description: error.message,
          variant: "destructive",
        });
      } else {
        const unreadCounts = data?.map((unread) => ({
          chat_room_id: unread.chat_room_id,
          total_count: unread.total_count,
        }));

        set({
          unread_counts: unreadCounts,
        });
      }
    } catch (error) {
      toast({
        title: "Failed to fetch unread messages",
        description: error instanceof Error ? error.message : String(error),
        variant: "destructive",
      });
    }
  },
}));
