import { z } from "zod";

enum QuestionType {
  MULTIPLE_CHOICE = "MUTLI_CHOICE",
  SINGLE_CHOICE = "SINGLE_CHOICE",
}

export type FormOption = {
  id: string;
  created_at?: Date;
  updated_at?: Date;
  type?: QuestionType;
  question_id: string;
  option_text: string;
  price: number[];
  metadata?: JSON | null;
};

export type FormQuestion = {
  id: string;
  created_at: Date;
  updated_at: Date;
  type: QuestionType;
  form_text: string;
  order: number;
  metadata?: JSON | null;
  form_option: FormOption[];
};

export const CreateFormOptionSchema = z.object({
  // question_id: z.string().min(1, { message: "Question ID is required" }),
  option_text: z.string().min(1, { message: "Text is required" }),
  price: z.number({ message: "Price is required" }).array(),
});

export const CreateFormQuestionSchema = z.object({
  form_text: z.string().min(1, { message: "Text is required" }),
  order: z.number().min(1, { message: "Order must be bigger or equal to 1" }),
  options: z.array(CreateFormOptionSchema),
});

export type CreateFormQuestion = z.infer<typeof CreateFormQuestionSchema>;
export type CreateFormOption = z.infer<typeof CreateFormOptionSchema>;
