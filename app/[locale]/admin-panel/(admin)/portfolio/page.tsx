import CustomCreateButton from "@/components/ui/button/custom-create-button";
import { LinkButton } from "@/components/ui/button/link-button";
import ImageContainer from "@/components/ui/image/image-container";
import Tag from "@/components/ui/tag";
import { getAllPortfolio } from "@/data/portfolio";
import Link from "next/link";
import React, { Suspense } from "react";
import { IoAddOutline } from "react-icons/io5";
import placeholder from "@/public/image/placeholder-portfolio.png";
import PortfolioOptionDropdown from "@/components/ui/dropdown/portfolio-option-dropdown";
import PortfolioListSkeleton from "@/components/ui/skeleton/portfolio-list-skeleton";
import { Portfolio } from "@/types/portfolio.type";

export default async function PortfolioPage() {
  const { data: portfolios, error } = await getAllPortfolio();

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
      <Suspense fallback={<PortfolioListSkeleton />}>
        <div className="mt-4 flex gap-2">
          {portfolios?.map((portfolio) => (
            <Link
              href={"/admin-panel/portfolio/" + portfolio.slug}
              key={portfolio.id}
              className="max-h-[350px] min-h-[100px] w-[300px] rounded-md border p-3 transition-all duration-300 hover:cursor-pointer hover:border-label/50"
            >
              <ImageContainer
                src={portfolio.cover_url || placeholder}
                className="h-[200px] overflow-hidden rounded-sm"
              />
              <div className="my-2 min-h-[70px]">
                <h2 className="line-clamp-1 text-lg font-bold">
                  {portfolio.title}
                </h2>
                <p className="mt-1 line-clamp-2 text-xs text-label">
                  {portfolio.description}
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <Tag color="blue" className="rounded-full">
                  Art
                </Tag>
                <PortfolioOptionDropdown portfolio={portfolio} />
              </div>
            </Link>
          ))}
          <CustomCreateButton
            href="/admin-panel/portfolio/create"
            className="h-[350px] w-[300px] px-4 py-1"
          />
        </div>
      </Suspense>
    </div>
  );
}
