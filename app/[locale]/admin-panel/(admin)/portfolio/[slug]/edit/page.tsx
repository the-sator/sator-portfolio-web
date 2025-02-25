import PortfolioForm from "@/components/ui/form/portfolio-form";
import { Skeleton } from "@/components/ui/skeleton";
import { ADMIN_LOGIN_PATH } from "@/constant/base";
import { getAdminSession } from "@/data/admin";
import { getAllCategories } from "@/data/category";
import { getPortfolioBySlug } from "@/data/portfolio";
import { notFound, redirect } from "next/navigation";
import React, { Suspense } from "react";
type Props = {
  params: Promise<{ slug: string }>;
};
export default async function page({ params }: Props) {
  const slug = (await params).slug;
  const [{ data }, { data: categories }, { data: portfolio }] =
    await Promise.all([
      getAdminSession(),
      getAllCategories(),
      getPortfolioBySlug(slug),
    ]);
  if (!data) {
    return redirect(ADMIN_LOGIN_PATH);
  }

  if (!portfolio) {
    notFound();
  }

  return (
    <div className="p-4">
      <Suspense fallback={<Skeleton className="min-h-svh w-full" />}>
        <PortfolioForm
          admin={data}
          categories={categories || []}
          portfolio={portfolio}
        />
      </Suspense>
    </div>
  );
}
