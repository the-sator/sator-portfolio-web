import { useQuery } from "@tanstack/react-query";
import { getAttemptByIdAction } from "@/action/portfolio-form.action";
const queryKey = (id: string) => [`form-attempt:${id}`];
export function useGetFormAttemptByID(
  id: string,
  options: { enabled?: boolean } = {},
) {
  return useQuery({
    queryKey: queryKey(id ?? "s"),
    queryFn: async () => {
      if (!id) return;
      return await getAttemptByIdAction(id);
    },
    enabled: options.enabled, // Use the enabled option to control when the query should run
    ...options,
  });
}
