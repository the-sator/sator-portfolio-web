import { z } from "zod";
import { BaseFilterSchema, NextPrevious } from "./base.type";
import { User } from "./user.type";

export enum QuestionType {
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

export type FormQuestionPagination = FormQuestion & NextPrevious;

export type FormResponse = {
  id: string;
  created_at: Date;
  updated_at: Date;
  question_id: string;
  option_id: string;
  metadata?: JSON | null;
};

export type FormAttempt = {
  id: string;
  created_at: Date;
  updated_at: Date;
  quoted_price: number[];
  user_id: string;
  user: User;
  form_response: FormResponse[];
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

export const CreateFormResponseSchema = z.object({
  question_id: z.string().min(1, { message: "Question ID is required" }),
  option_id: z.string().min(1, { message: "Option ID is required" }),
  metadata: z.any().optional(),
});

export const CreateFormAttemptSchema = z.object({
  responses: z.array(CreateFormResponseSchema),
});

export const PortfolioFormFilterSchema = BaseFilterSchema.extend({
  order: z.string().optional(),
  id: z.string().optional(),
});

export const FormAttemptFilterSchema = BaseFilterSchema.extend({
  id: z.string().optional(),
});

export type CreateFormQuestion = z.infer<typeof CreateFormQuestionSchema>;
export type CreateFormOption = z.infer<typeof CreateFormOptionSchema>;
export type CreateFormResponse = z.infer<typeof CreateFormResponseSchema>;
export type CreateFormAttempt = z.infer<typeof CreateFormAttemptSchema>;
export type PortfolioFormFilter = z.infer<typeof PortfolioFormFilterSchema>;
export type FormAttemptFilter = z.infer<typeof FormAttemptFilterSchema>;
