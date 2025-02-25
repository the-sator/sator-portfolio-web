import BlogCard from "@/components/blog/blog-card";
import BlogCardSimple from "@/components/blog/blog-card-simple";
import FilterInput from "@/components/ui/filter/filter-input";
import { Separator } from "@/components/ui/separator";
import { findAllBlog } from "@/data/blog";
import React from "react";

export default async function page() {
  const { data: blogs, error } = await findAllBlog();
  return (
    <div className="my-10 w-full px-24">
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-bold">Blog</h1>
        <FilterInput filterKey="name" placeholder="Search...." />
      </div>
      <div className="mt-4">
        {/* {Array.from({ length: 6 }).map((_, index) => (
          <BlogCard key={index} />
          ))} */}
        {blogs && blogs.length > 0 ? (
          <div className="grid w-full grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[calc(100svh-240px)] w-full items-center justify-center">
            <p>No Blog Yet</p>
          </div>
        )}
      </div>
      {blogs && blogs.length > 6 && (
        <div className="mt-10 flex flex-col gap-4">
          <h1 className="text-xl font-bold">More Blogs</h1>
          <Separator />
          <div className="grid grid-cols-1 gap-4">
            {Array.from({ length: 10 }).map((_, index) => (
              <BlogCardSimple key={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
