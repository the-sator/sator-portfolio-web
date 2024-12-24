import { getAllInvitableChatMemberAction } from "@/action/chat-member.action";
import { useQuery } from "@tanstack/react-query";
function getQueryKey() {
  return [`chat-member`];
}

export function useGetInvitableChatMember(options?: object) {
  return useQuery({
    queryKey: getQueryKey(),
    queryFn: getAllInvitableChatMemberAction,
    ...options,
  });
}
