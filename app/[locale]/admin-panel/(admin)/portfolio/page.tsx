import { LinkButton } from "@/components/ui/button/link-button";
import { paginatePortfolio } from "@/data/portfolio";
import React from "react";
import { IoAddOutline } from "react-icons/io5";
import PortfolioInfiniteScroll from "@/components/portfolio/portfolio-infinite-scroll";
import FilterInput from "@/components/ui/filter/filter-input";
import FilterCombobox from "@/components/ui/filter/filter-combobox";
import { getAllCategories } from "@/data/category";
import { ComboboxOption } from "@/components/ui/combobox";
type Props = {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};
export default async function PortfolioPage({ searchParams }: Props) {
  const filter = await searchParams;
  const [{ data: portfolios }, { data: categories }] = await Promise.all([
    paginatePortfolio(filter),
    getAllCategories(),
  ]);
  const options: ComboboxOption[] = categories
    ? categories.map((category) => {
        return {
          label: category.name,
          value: category.id,
        };
      })
    : [];
  console.log("portfolios:", portfolios);
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
      <div className="my-2 flex h-10 gap-2">
        <FilterInput placeholder="Title" filterKey="title" className="h-full" />
        <FilterCombobox filterKey="category" options={options} />
      </div>
      <PortfolioInfiniteScroll portfolios={portfolios!} />
    </div>
  );
}
