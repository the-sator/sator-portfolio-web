import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import {
  CreateQuestionModal,
  EditQuestionModal,
} from "@/components/ui/modal/question-modal";
import { PortfolioFormColumns } from "@/components/ui/table/columns/portfolio-form.column";
import { getAllQuestions, getPagination } from "@/data/portfolio-form";
import { getTranslations } from "next-intl/server";
import React from "react";
type Props = {
  searchParams: Promise<{ page: string; limit: string }>;
};
export default async function page({ searchParams }: Props) {
  const t = await getTranslations("PortfolioForm");
  const page = (await searchParams).page;
  const limit = (await searchParams).limit;
  const { data: questions, metadata } = await getPagination(page, limit);
  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl">{t("portfolio-form")}</h1>
        <CreateQuestionModal />
        <EditQuestionModal questions={questions} />
      </div>
      <div className="flex items-center gap-2">
        <Input placeholder="Username" />
        <Input placeholder="Email" />
        <Button variant="destructive">Clear</Button>
      </div>
      <DataTable
        remote
        columns={PortfolioFormColumns}
        data={questions || []}
        metadata={metadata}
      />
    </div>
  );
}
