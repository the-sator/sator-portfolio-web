"use server";
import {
  createFormAttempt,
  createQuestion,
  deleteQuestion,
  updateQuestion,
} from "@/data/portfolio-form";
import {
  CreateFormAttempt,
  CreateFormAttemptSchema,
  CreateFormQuestion,
  CreateFormQuestionSchema,
} from "@/types/portfolio-form.type";
import { revalidateTag } from "next/cache";

export async function createQuestionAction(formData: unknown) {
  const result = CreateFormQuestionSchema.safeParse(formData);
  if (!result.success) {
    return {
      error: result.error.format(),
    };
  }
  const data: CreateFormQuestion = {
    form_text: result.data.form_text,
    order: result.data.order,
    options: result.data.options,
  };

  const { error } = await createQuestion(data);
  if (error) {
    return {
      error: error,
    };
  }
  revalidateTag("portfolio-form");
  return { error };
}

export async function deleteQuestionAction(id: string) {
  const { error } = await deleteQuestion(id);
  if (error) {
    return {
      error: error,
    };
  }
  revalidateTag("portfolio-form");
  return { error };
}

export async function updateQuestionAction(id: string, formData: unknown) {
  const result = CreateFormQuestionSchema.safeParse(formData);
  if (!result.success) {
    return {
      error: result.error.format(),
    };
  }
  const data: CreateFormQuestion = {
    form_text: result.data.form_text,
    order: result.data.order,
    options: result.data.options,
  };
  const { error } = await updateQuestion(id, data);
  if (error) {
    return {
      error: error,
    };
  }
  revalidateTag("portfolio-form");
  return { error };
}

export async function createFormAttemptAction(formData: unknown) {
  const result = CreateFormAttemptSchema.safeParse(formData);
  if (!result.success) {
    return {
      error: result.error.format(),
    };
  }
  const payload: CreateFormAttempt = {
    responses: result.data.responses,
  };
  const { data, error } = await createFormAttempt(payload);

  revalidateTag("form-attempt");
  return { data, error };
}
