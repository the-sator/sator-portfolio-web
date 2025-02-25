import { useInfiniteQuery } from "@tanstack/react-query";
import { PortfolioFilter } from "@/types/portfolio.type";
import { BlogFilter } from "@/types/blog.type";
import { getBlogPaginationAction } from "@/action/blog.action";
export function getBlogQueryKey() {
  return "blog";
}

export function getFilterQueryKey(filter: BlogFilter) {
  return ["blog", filter];
}

export function useGetInfiniteBlogs(filter: PortfolioFilter, options: object) {
  return useInfiniteQuery({
    queryKey: [getBlogQueryKey(), getFilterQueryKey(filter)],
    queryFn: ({ pageParam }) =>
      getBlogPaginationAction({
        ...filter,
        page: String(pageParam),
      }),
    getNextPageParam: (lastPage) => {
      return lastPage.page !== null ? lastPage.page : undefined;
    },
    initialPageParam: 1,
    ...options,
  });
}
