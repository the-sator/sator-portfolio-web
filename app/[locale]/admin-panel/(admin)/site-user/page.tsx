import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import FilterInput from "@/components/ui/filter/filter-input";
import ApiKeyModal from "@/components/ui/modal/api-key-modals";
import { CreateSiteUserModal } from "@/components/ui/modal/site-user-modals";
import { SiteUserColumn } from "@/components/ui/table/columns/site-user.column";
import { getPaginateSiteUser } from "@/data/site-user";
import { getAllUsers } from "@/data/user";
import { getTranslations } from "next-intl/server";
import React from "react";
type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export default async function SiteUserPage({ searchParams }: Props) {
  const filter = await searchParams;
  const t = await getTranslations("SiteUser");
  const [{ data, metadata, error }, { data: users }] = await Promise.all([
    getPaginateSiteUser(filter),
    getAllUsers(),
  ]);
  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl">{t("site-user")}</h1>
        <CreateSiteUserModal users={users || []} />
        <ApiKeyModal siteUsers={data} />
      </div>
      <div className="flex items-center gap-2">
        <FilterInput placeholder="Username" filterKey="username" />
        <FilterInput placeholder="Email" filterKey="email" />
        <Button variant="destructive">Clear</Button>
      </div>
      <DataTable
        columns={SiteUserColumn}
        data={data || []}
        error={error}
        metadata={metadata}
      />
    </div>
  );
}
