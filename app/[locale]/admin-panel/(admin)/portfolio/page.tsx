import CustomCreateButton from "@/components/ui/button/custom-create-button";
import { LinkButton } from "@/components/ui/button/link-button";
import Tag from "@/components/ui/tag";
import { getAllPortfolio } from "@/data/portfolio";
import Link from "next/link";
import React from "react";
import { IoAddOutline } from "react-icons/io5";

export default async function PortfolioPage() {
  const { data, error } = await getAllPortfolio();
  console.log("data:", data);
  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Portfolio</h1>
        {/* <Link
          href={`/portfolio/create`}
          className="group flex items-center gap-2 rounded-md border px-4 py-1 transition-all hover:border-blue-800/70"
        >
          <IoAddOutline size={14} className="group-hover:text-blue-700" />
          <p className="text-sm group-hover:text-blue-700">Create</p>
        </Link> */}

        <LinkButton
          href={`/admin-panel/portfolio/create`}
          variant="outline"
          // className="group flex items-center gap-2 rounded-md border px-4 py-1 transition-all hover:border-blue-800/70"
        >
          <IoAddOutline size={14} className="group-hover:text-blue-700" />
          <p className="text-sm group-hover:text-blue-700">Create</p>
        </LinkButton>
      </div>

      <div className="mt-4 flex gap-2">
        {/* <div className="max-h-[300px] min-h-[100px] w-[250px] rounded-md border p-3 transition-all duration-300 hover:cursor-pointer hover:border-label/50">
          <ImageContainer
            src={placeholder}
            className="h-[200px] overflow-hidden rounded-sm"
          />
          <div className="my-2">
            <h2 className="text-lg font-bold">Project Demolition</h2>
            <p className="mt-1 line-clamp-2 text-xs text-label">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
              assumenda ducimus facere quis ex. Eos error quasi minus officia ex
              fuga exercitationem, voluptatibus reprehenderit enim suscipit
              illum magnam nobis sint.
            </p>
          </div>
          <Tag color="blue" className="rounded-full">
            Art
          </Tag>
        </div> */}
        {/* <Link
          href={`/portfolio/create`}
          className="group flex min-h-[300px] w-[250px] items-center justify-center rounded-md border border-dashed p-0 transition-all hover:border-black hover:dark:border-label/50"
        >
          <IoAddOutline
            size={24}
            className="text-label group-hover:text-black group-hover:dark:text-label/50"
          />
        </Link> */}

        {data?.map((data) => (
          <Link
            href={"/admin-panel/portfolio/" + data.slug}
            key={data.id}
            className="max-h-[300px] min-h-[100px] w-[250px] rounded-md border p-3 transition-all duration-300 hover:cursor-pointer hover:border-label/50"
          >
            {/* <ImageContainer
            src={placeholder}
            className="h-[200px] overflow-hidden rounded-sm"
          /> */}
            <div className="my-2">
              <h2 className="text-lg font-bold">{data.title}</h2>
              <p className="mt-1 line-clamp-2 text-xs text-label">
                {data.description}
                {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
              assumenda ducimus facere quis ex. Eos error quasi minus officia ex
              fuga exercitationem, voluptatibus reprehenderit enim suscipit
              illum magnam nobis sint. */}
              </p>
            </div>
            <Tag color="blue" className="rounded-full">
              Art
            </Tag>
          </Link>
        ))}
        <CustomCreateButton
          href="/admin-panel/portfolio/create"
          className="max-h-[300px] min-h-[100px] w-[250px] px-4 py-1"
        />
      </div>
    </div>
  );
}
