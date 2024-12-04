import CustomCreateButton from "@/components/ui/button/custom-create-button";
import { LinkButton } from "@/components/ui/button/link-button";
import ImageContainer from "@/components/ui/image/image-container";
import Tag from "@/components/ui/tag";
import { getAllPortfolio } from "@/data/portfolio";
import Link from "next/link";
import React from "react";
import { IoAddOutline } from "react-icons/io5";
import placeholder from "@/public/image/placeholder-portfolio.png";
import PortfolioOptionDropdown from "@/components/ui/dropdown/portfolio-option-dropdown";

export default async function PortfolioPage() {
  const { data, error } = await getAllPortfolio();
  console.log("data:", data);
  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Portfolio</h1>
        <LinkButton href={`/admin-panel/portfolio/create`} variant="outline">
          <IoAddOutline size={14} className="group-hover:text-blue-700" />
          <p className="text-sm group-hover:text-blue-700">Create</p>
        </LinkButton>
      </div>
      <div className="mt-4 flex gap-2">
        {data?.map((data) => (
          <Link
            href={"/admin-panel/portfolio/" + data.slug}
            key={data.id}
            className="max-h-[350px] min-h-[100px] w-[300px] rounded-md border p-3 transition-all duration-300 hover:cursor-pointer hover:border-label/50"
          >
            <ImageContainer
              src={data.cover_url || placeholder}
              className="h-[200px] overflow-hidden rounded-sm"
            />
            <div className="my-1 min-h-[60px]">
              <h2 className="line-clamp-1 text-lg font-bold">{data.title}</h2>
              <p className="mt-1 line-clamp-2 text-xs text-label">
                {data.description}
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <Tag color="blue" className="rounded-full">
                Art
              </Tag>
              <PortfolioOptionDropdown />
            </div>
          </Link>
        ))}
        <CustomCreateButton
          href="/admin-panel/portfolio/create"
          className="max-h-[400px] min-h-[100px] w-[300px] px-4 py-1"
        />
      </div>
    </div>
  );
}
