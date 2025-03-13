import { getQuestionById } from "@/data/portfolio-form";
import React from "react";
import NameInput from "./_component/name-input";
import { notFound, redirect } from "next/navigation";

export default async function page() {
  const { data: question } = await getQuestionById();
  if (!question) notFound();
  // return (
  //   <div className="flex min-h-[calc(100svh-56px)] w-full items-center justify-center">
  //     <NameInput formLink={question?.id} />
  //   </div>
  // );
  redirect(`/form/${question.id}`);
}
