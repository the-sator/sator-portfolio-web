import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { getTranslations } from "next-intl/server";
import React from "react";
import { CreateUserModal } from "@/components/ui/modal/user-modals";
import { getPaginateUsers } from "@/data/user";
import FilterInput from "@/components/ui/filter/filter-input";
import { WebsiteColumn } from "@/components/ui/table/columns/site.column";
type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export default async function page({ searchParams }: Props) {
  const filter = await searchParams;
  const t = await getTranslations("Site");
  //   const { data, metadata, error } = await getPaginateUsers(filter);
  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl">{t("website")}</h1>
        <CreateUserModal />
      </div>
      <div className="flex items-center gap-2">
        <FilterInput placeholder="Username" filterKey="username" />
        <FilterInput placeholder="Email" filterKey="email" />
        <Button variant="destructive">Clear</Button>
      </div>
      <DataTable
        columns={WebsiteColumn}
        data={[]}
        // error={error}
        // metadata={metadata}
      />
    </div>
  );
}
