"use client";
import React from "react";
import PortfolioCard from "./portfolio-card";
import InfiniteScroll from "react-infinite-scroll-component";
import { Portfolio } from "@/types/portfolio.type";
import Spinner from "../ui/spinner";
import { useGetInfinitePortfolios } from "@/data/query/portfolio";
type Props = {
  portfolios: Portfolio[];
};
export default function PortfolioInfiniteScroll({ portfolios }: Props) {
  const { data, fetchNextPage, hasNextPage } = useGetInfinitePortfolios(
    portfolios,
    {},
  );

  const portfolioItems = data?.pages.flatMap((page) => page.data) || [];
  return (
    <InfiniteScroll
      dataLength={portfolioItems.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
      scrollThreshold={0.5}
      loader={
        <div className="grid w-full grid-cols-1 place-items-center py-2.5">
          <Spinner size={18} />
        </div>
      }
      className="my-4 mb-10 !overflow-visible"
    >
      {/* <div className="flex flex-wrap gap-4"> */}
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {portfolioItems.map((portfolio) => (
          <PortfolioCard key={portfolio?.id} portfolio={portfolio!} />
        ))}
      </div>
    </InfiniteScroll>
  );
}
