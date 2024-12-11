import { useInfiniteQuery } from "@tanstack/react-query";
import { Portfolio } from "@/types/portfolio.type";
import { getPortfolioPaginationAction } from "@/action/portfolio.action";
export function getQueryKey() {
  return ["portfolio"];
}

export function useGetInfinitePortfolios(
  initialData: Portfolio[],
  options: object,
) {
  return useInfiniteQuery({
    queryKey: getQueryKey(),
    queryFn: ({ pageParam = 1 }) =>
      getPortfolioPaginationAction({ page: String(pageParam) }),
    getNextPageParam: (lastPage) => {
      return lastPage.page !== null ? lastPage.page : undefined;
    },
    initialPageParam: 1,
    initialData: {
      pages: [{ data: initialData || [], page: 2 }],
      pageParams: [undefined],
    },
    ...options,
  });
}
