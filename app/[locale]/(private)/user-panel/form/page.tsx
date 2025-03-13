import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import FilterInput from "@/components/ui/filter/filter-input";
import { CreateUserModal } from "@/components/ui/modal/user-modals";
import { FormColumn } from "@/components/ui/table/columns/form-columns";
import { paginateAttemptByUser } from "@/data/portfolio-form";
import { FormAttemptFilter } from "@/types/portfolio-form.type";
import { getTranslations } from "next-intl/server";
import React from "react";
type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export default async function page({ searchParams }: Props) {
  const t = await getTranslations("Form");
  const filter = await searchParams;
  const {
    data: attempts,
    metadata,
    error,
  } = await paginateAttemptByUser(filter as FormAttemptFilter);
  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl">{t("form")}</h1>
        <CreateUserModal />
      </div>
      <div className="flex items-center gap-2">
        <FilterInput placeholder="Username" filterKey="username" />
        <FilterInput placeholder="Email" filterKey="email" />
        <Button variant="destructive">Clear</Button>
      </div>
      <DataTable
        columns={FormColumn}
        data={attempts || []}
        error={error}
        metadata={metadata}
      />
    </div>
  );
}
