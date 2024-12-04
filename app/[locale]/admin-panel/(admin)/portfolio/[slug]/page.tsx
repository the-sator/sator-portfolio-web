import { getPortfolioBySlug } from "@/data/portfolio";
import React from "react";
import { DynamicRenderContent } from "@/components/editor/render-content";
import ImageContainer from "@/components/ui/image/image-container";
import PortfolioGallery from "@/components/ui/portfolio-gallery";
import { notFound } from "next/navigation";
import PortfolioOptionDropdown from "@/components/ui/dropdown/portfolio-option-dropdown";
import { cn } from "@/lib/utils";
type Props = {
  params: Promise<{ slug: string }>;
};
export default async function page({ params }: Props) {
  const slug = (await params).slug;
  const { data } = await getPortfolioBySlug(slug);
  if (!data) {
    notFound();
  }
  return (
    <div className="p-4">
      <div className="mb-4 flex justify-end gap-4">
        <div
          className={cn(
            "flex h-fit items-center justify-center gap-4 rounded-md border border-border px-4 py-2",
            data.published_at && "border-green-400",
          )}
        >
          <span
            className={cn(
              "size-2 rounded-full bg-border",
              data.published_at && "bg-green-400",
            )}
          ></span>
          <p className={cn("text-sm", data.published_at && "text-green-400")}>
            Published
          </p>
        </div>
        <PortfolioOptionDropdown />
      </div>
      {data.cover_url && (
        <ImageContainer
          src={data.cover_url}
          className="h-[200px] overflow-hidden rounded-sm"
        />
      )}
      <h1 className="mb-5 mt-10 text-4xl font-bold">{data?.title}</h1>
      <DynamicRenderContent content={data.content || []} />

      {data.gallery.length > 0 && <PortfolioGallery images={data.gallery} />}
    </div>
  );
}
