"use client";
import React from "react";
import { LinkButton } from "@/components/ui/button/link-button";
import { InputWithLabel } from "@/components/ui/input-label";
import { usePortfolioForm } from "@/store/portfolio-form";
type Props = {
  formLink: string;
};
export default function NameInput({ formLink }: Props) {
  const { name, setName } = usePortfolioForm();
  return (
    <div className="flex flex-col gap-4">
      <InputWithLabel
        label="Name"
        className="min-w-[400px]"
        defaultValue={name}
        onChange={(e) => setName(e.target.value)}
      />
      <LinkButton href={`/form/${formLink}`}>Start Now</LinkButton>
    </div>
  );
}
