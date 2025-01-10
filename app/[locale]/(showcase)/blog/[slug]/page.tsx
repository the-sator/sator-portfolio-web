import { increaseViewBlogAction } from "@/action/blog.action";
import { DynamicRenderContent } from "@/components/editor/render-content";
import BackButton from "@/components/ui/button/back-button";
import ImageContainerBlur from "@/components/ui/image/image-container-blur";
import BlogDetailSkeleton from "@/components/ui/skeleton/blog-detail-skeleton";
import { getBlogBySlug } from "@/data/blog";
import { cn } from "@/lib/utils";
import { revalidateTag } from "next/cache";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

type Props = {
  params: Promise<{ slug: string }>;
};
export default async function page({ params }: Props) {
  const slug = (await params).slug;
  const { data: blog, error: blogError } = await getBlogBySlug(slug);
  const { error } = await increaseViewBlogAction(slug);
  if (!blog) {
    notFound();
  }
  if (error) {
    console.error("Failed to increase view count:", error);
  }
  return (
    <div className="px-20 py-5">
      <BackButton />
      <Suspense fallback={<BlogDetailSkeleton />}>
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
