import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import {
  CreateQuestionModal,
  EditQuestionModal,
} from "@/components/ui/modal/question-modal";
import { PortfolioFormColumns } from "@/components/ui/table/columns/portfolio-form.column";
import { getAllQuestions } from "@/data/portfolio-form";
import { getTranslations } from "next-intl/server";
import React from "react";

export default async function page() {
  const t = await getTranslations("PortfolioForm");
  const { data: questions } = await getAllQuestions();
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
      <DataTable columns={PortfolioFormColumns} data={questions || []} />
    </div>
  );
}
