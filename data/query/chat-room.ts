import { ChatRoomFilter } from "@/types/chat.type";
import { useInfiniteQuery } from "@tanstack/react-query";
import { paginateChatRoomAction } from "@/action/chat-room.action";

export function getQueryKey() {
  return ["chat-room"];
}

export function getFilterQueryKey(filter: ChatRoomFilter) {
  return ["chat-room", filter];
}

export function getChatRoomQueryKey(roomId: string) {
  return [`chat-room:${roomId}`];
}

export function useGetInfiniteChatRoom(
  filter: ChatRoomFilter,
  isAdmin: boolean,
  options?: object,
) {
  return useInfiniteQuery({
    queryKey: [getQueryKey(), getFilterQueryKey(filter)],
    queryFn: ({ pageParam }) => {
      const data = paginateChatRoomAction(
        {
          ...filter,
          page: String(pageParam),
          limit: "15",
        },
        isAdmin,
      );
      return data;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.page !== null ? lastPage.page : undefined;
    },
    initialPageParam: 1,
    ...options,
  });
}
