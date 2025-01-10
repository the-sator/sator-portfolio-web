import React, { Suspense } from "react";
import { DynamicRenderContent } from "@/components/editor/render-content";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";
import ImageContainerBlur from "@/components/ui/image/image-container-blur";
import { getBlogBySlug } from "@/data/blog";
import BlogOptionDropDown from "@/components/ui/dropdown/blog-option-dropdown";
import BlogDetailSkeleton from "@/components/ui/skeleton/blog-detail-skeleton";
type Props = {
  params: Promise<{ slug: string }>;
};
export default async function page({ params }: Props) {
  const slug = (await params).slug;
  const { data: blog } = await getBlogBySlug(slug);
  if (!blog) {
    notFound();
  }

  return (
    <div className="p-4">
      <Suspense fallback={<BlogDetailSkeleton />}>
        <div className="mb-4 flex items-center justify-end gap-4">
          <div
            className={cn(
              "flex h-fit items-center justify-center gap-4 rounded-md border border-border px-4 py-2",
              blog.published_at && "border-green-400",
            )}
          >
            <span
              className={cn(
                "size-2 rounded-full bg-border",
                blog.published_at && "bg-green-400",
              )}
            ></span>
            <p className={cn("text-sm", blog.published_at && "text-green-400")}>
              {blog.published_at ? "Published" : "Unpublish"}
            </p>
          </div>
          <BlogOptionDropDown blog={blog} deleteRedirect />
        </div>
        {blog.cover_url && (
          <ImageContainerBlur
            src={blog.cover_url}
            // priority={true}
            className="aspect-video h-[200px] w-full overflow-hidden rounded-sm"
          />
        )}

        <h1 className="mb-5 mt-10 text-4xl font-bold">{blog.title}</h1>
        <DynamicRenderContent content={blog.content || []} />
      </Suspense>
    </div>
  );
}
