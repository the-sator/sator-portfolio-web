import { increaseViewBlogAction } from "@/action/blog.action";
import { DynamicRenderContent } from "@/components/editor/render-content";
import BackButton from "@/components/ui/button/back-button";
import LikeButton from "@/components/ui/button/like-button";
import ImageContainerBlur from "@/components/ui/image/image-container-blur";
import { Separator } from "@/components/ui/separator";
import BlogDetailSkeleton from "@/components/ui/skeleton/blog-detail-skeleton";
import Tag from "@/components/ui/tag";
import { getBlogBySlug } from "@/data/blog";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/date";
import { revalidateTag } from "next/cache";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { IoShareSocialSharp } from "react-icons/io5";

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

        <section className="flex flex-col gap-2">
          <h1 className="mt-10 text-4xl font-bold">{blog.title}</h1>
          <Tag>Release Note</Tag>
          <div className="mt-2 flex justify-between">
            <p className="text-sm text-label">
              Published at: {formatDate(new Date())}
            </p>
            <div className="flex gap-4">
              <LikeButton like={blog.like} />
              <IoShareSocialSharp size={20} />
            </div>
          </div>
        </section>
        <Separator className="my-4" />
        <DynamicRenderContent content={blog.content || []} />
      </Suspense>
    </div>
  );
}
