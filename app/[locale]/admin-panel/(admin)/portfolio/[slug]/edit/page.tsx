import PortfolioForm from "@/components/ui/form/portfolio-form";
import { getAdminSession } from "@/data/admin";
import { getAllCategories } from "@/data/category";
import { getPortfolioBySlug } from "@/data/portfolio";
import { notFound, redirect } from "next/navigation";
import React from "react";
type Props = {
  params: Promise<{ slug: string }>;
};
export default async function page({ params }: Props) {
  const slug = (await params).slug;
  const [{ admin }, { data: categories }, { data: portfolio }] =
    await Promise.all([
      getAdminSession(),
      getAllCategories(),
      getPortfolioBySlug(slug),
    ]);
  if (!admin) {
    return redirect("/admin-panel/login");
  }
  console.log("portfolio:", portfolio);

  if (!portfolio) {
    notFound();
  }

  return (
    <div className="p-4">
      <PortfolioForm
        admin={admin}
        categories={categories || []}
        portfolio={portfolio}
      />
    </div>
  );
}
