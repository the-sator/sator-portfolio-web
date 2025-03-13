"use client";
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { usePortfolioForm } from "@/store/portfolio-form";
import { FormOption } from "@/types/portfolio-form.type";
type Props = {
  question_id: string;
  options: FormOption[];
};
export default function AnswerOptions({ question_id, options }: Props) {
  const { setResponses, responses } = usePortfolioForm();
  const response = responses.find((res) => res.question_id === question_id);
  return (
    <ToggleGroup
      type="single"
      className="grid w-full grid-cols-2 gap-8"
      defaultValue={response?.option_id}
      onValueChange={(value) =>
        setResponses({
          question_id: question_id,
          option_id: value,
        })
      }
    >
      {options.map((option) => (
        <ToggleGroupItem
          key={option.id}
          value={option.id}
          aria-label="Toggle bold"
          variant="outline"
          className="min-h-12"
        >
          {option.option_text}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
