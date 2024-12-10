import CustomCreateButton from "@/components/ui/button/custom-create-button";
import { LinkButton } from "@/components/ui/button/link-button";
import ImageContainer from "@/components/ui/image/image-container";
import Tag from "@/components/ui/tag";
import { paginatePortfolio } from "@/data/portfolio";
import Link from "next/link";
import React, { Suspense } from "react";
import { IoAddOutline } from "react-icons/io5";
import placeholder from "@/public/image/placeholder-portfolio.png";
import PortfolioOptionDropdown from "@/components/ui/dropdown/portfolio-option-dropdown";
import PortfolioListSkeleton from "@/components/ui/skeleton/portfolio-list-skeleton";
import PortfolioInfiniteScroll from "@/components/portfolio/portfolio-infinite-scroll";
export default async function PortfolioPage() {
  const { data: portfolios } = await paginatePortfolio("1");
  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Portfolio</h1>
        <LinkButton
          href={`/admin-panel/portfolio/create`}
          variant="outline"
          className="gap-2"
        >
          <IoAddOutline size={14} className="group-hover:text-blue-700" />
          <p className="text-sm group-hover:text-blue-700">Create</p>
        </LinkButton>
      </div>
      <PortfolioInfiniteScroll portfolios={portfolios!} />
    </div>
  );
}
