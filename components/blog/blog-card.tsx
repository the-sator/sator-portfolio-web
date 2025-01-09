import Link from "next/link";
import React from "react";
import ImageContainerBlurClient from "../ui/image/image-container-blur-client";
import Tag from "../ui/tag";
import { formatDate } from "@/utils/date";
import { Blog } from "@/types/blog.type";
type Props = {
  blog: Blog;
};
export default function BlogCard({ blog }: Props) {
  return (
    <Link
      href={`/admin-panel/blog/${blog.slug}`}
      className="flex max-h-[200px] min-h-[100px] w-full rounded-sm border transition-all duration-300 hover:cursor-pointer hover:border-label/50"
    >
      <ImageContainerBlurClient
        src={
          blog.cover_url ? blog.cover_url : "/image/placeholder-portfolio.png"
        }
        className="w-[30%] flex-shrink-0 overflow-hidden rounded-sm"
      />
      <div className="mx-10 my-6 flex w-full flex-col gap-2">
        <div className="flex gap-2">
          {blog.CategoryOnBlog.map((category) => (
            <Tag
              key={category.category_id}
              color={category.category.color.toLowerCase()}
            >
              {category.category.name}
            </Tag>
          ))}
        </div>
        <div className="min-h-[90px]">
          <h2 className="line-clamp-1 text-lg font-bold">{blog.title}</h2>
          <p className="mt-1 line-clamp-3 text-xs text-label">
            {blog.description}
          </p>
        </div>

        <div className="flex w-full justify-between">
          <p className="line-clamp-1 text-xs text-label">
            {formatDate(blog.created_at)}
          </p>
          <p className="line-clamp-1 text-xs text-label">{blog.view} views</p>
        </div>
      </div>
    </Link>
  );
}
