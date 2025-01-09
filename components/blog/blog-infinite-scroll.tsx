"use client";
import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CustomCreateButton from "../ui/button/custom-create-button";
import { toast } from "@/hooks/use-toast";
import Spinner from "../ui/spinner";
import BlogCard from "./blog-card";
import { useGetInfiniteBlogs } from "@/data/query/blog";
import { BlogFilter } from "@/types/blog.type";
type Props = {
  filter: BlogFilter;
};
export default function BlogInfiniteScroll({ filter }: Props) {
  const { data, fetchNextPage, hasNextPage, error, isError } =
    useGetInfiniteBlogs(filter, {});
  const blogItems = data?.pages.flatMap((page) => page.data) || [];

  useEffect(() => {
    if (isError) {
      toast({
        title: "Error Fetching Blog",
        description: error.message,
        variant: "destructive",
      });
    }
  }, [isError]);

  return (
    <>
      {blogItems.length > 0 ? (
        <InfiniteScroll
          dataLength={blogItems.length}
          next={fetchNextPage}
          hasMore={hasNextPage}
          scrollThreshold={0.5}
          loader={
            <div className="grid w-full grid-cols-1 place-items-center py-2.5">
              <Spinner size={18} />
            </div>
          }
          className="my-4 mb-10 !overflow-visible"
        >
          {/* <div className="flex flex-wrap gap-4"> */}
          <div className="grid w-full grid-cols-1 gap-4">
            {blogItems.map((blog) => (
              <BlogCard key={blog?.id} blog={blog!} />
            ))}
          </div>
        </InfiniteScroll>
      ) : (
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <CustomCreateButton
            href={"/admin-panel/blog/create"}
            className="min-h-[350px]"
          />
        </div>
      )}
    </>
  );
}
