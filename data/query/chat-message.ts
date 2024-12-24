import { paginateMessageByRoomIDAction } from "@/action/chat-message.action";
import { ChatMessageFilter } from "@/types/chat.type";
import { useInfiniteQuery } from "@tanstack/react-query";

export function getQueryKey() {
  return ["chat-message"];
}

export function getChatRoomQueryKey(roomId: string) {
  return [`chat-message:${roomId}`];
}

export function useGetInfiniteAdminChat(
  roomId: string,
  filter: ChatMessageFilter,
  isAdmin: boolean,
  options: object,
) {
  return useInfiniteQuery({
    queryKey: getChatRoomQueryKey(roomId),
    queryFn: ({ pageParam }) => {
      return paginateMessageByRoomIDAction(
        roomId,
        {
          ...filter,
          page: String(pageParam),
          limit: "20",
        },
        isAdmin,
      );
    },
    getNextPageParam: (lastPage) => {
      return lastPage.page !== null ? lastPage.page : undefined;
    },
    initialPageParam: 1,
    ...options,
  });
}
