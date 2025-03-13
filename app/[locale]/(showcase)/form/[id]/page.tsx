import React, { Suspense } from "react";
import NavigationArrow from "./_component/navigation-arrow";
import AnswerOptions from "./_component/answer-option";
import { getQuestionById } from "@/data/portfolio-form";
import { notFound } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
type Props = {
  params: Promise<{ id: string }>;
};
export default async function page({ params }: Props) {
  const { id } = await params;
  const { data: question } = await getQuestionById(id);
  if (!question) {
    notFound();
  }

  return (
    <div className="flex min-h-[calc(100svh-56px)] w-full items-center justify-center">
      <Suspense fallback={<Skeleton className="h-10 w-full" />}>
        <div className="flex min-w-[500px] flex-col items-center gap-10">
          <p>{question.form_text}</p>
          <AnswerOptions question_id={id} options={question.form_option} />
        </div>
      </Suspense>
      <NavigationArrow next={question.next} previous={question.previous} />
    </div>
  );
}
