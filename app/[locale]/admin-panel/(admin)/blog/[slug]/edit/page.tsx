import BlogForm from "@/components/ui/form/blog-form";
import { Skeleton } from "@/components/ui/skeleton";
import { ADMIN_LOGIN_PATH } from "@/constant/base";
import { getAdminSession } from "@/data/admin";
import { getBlogBySlug } from "@/data/blog";
import { getAllCategories } from "@/data/category";
import { notFound, redirect } from "next/navigation";
import React, { Suspense } from "react";

type Props = {
  params: Promise<{ slug: string }>;
};
export default async function page({ params }: Props) {
  const slug = (await params).slug;
  const [{ data }, { data: categories }, { data: blog }] = await Promise.all([
    getAdminSession(),
    getAllCategories(),
    getBlogBySlug(slug),
  ]);
  if (!data) {
    return redirect(ADMIN_LOGIN_PATH);
  }

  if (!blog) {
    notFound();
  }

  return (
    <div className="p-4">
      <Suspense fallback={<Skeleton className="min-h-svh w-full" />}>
        <BlogForm admin={data} categories={categories || []} blog={blog} />
      </Suspense>
    </div>
  );
}
