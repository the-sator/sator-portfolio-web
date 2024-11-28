import { useQuery } from "@tanstack/react-query";
import { adminRoleById } from "@/action/role.action";
export function getQueryKey() {
  return ["role"];
}
export function useGetRoleByID(id: number, options: {}) {
  return useQuery({
    queryKey: getQueryKey(),
    queryFn: async () => {
      if (!id) throw new Error("No ID provided");
      return await adminRoleById(id);
    },
    ...options,
  });
}
