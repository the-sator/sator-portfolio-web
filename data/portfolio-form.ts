import { CreateFormQuestion, FormQuestion } from "@/types/portfolio-form.type";
import { fetchApi } from "@/utils/fetch-client";

export const getAllQuestions = async () => {
  const data = await fetchApi.get<FormQuestion[]>("/admin/question", [
    "form-question",
  ]);
  return data;
};

export const createQuestion = async (payload: CreateFormQuestion) => {
  const data = await fetchApi.post<FormQuestion>("/admin/question", payload, [
    "form-question",
  ]);
  return data;
};

export const deleteQuestion = async (id: string) => {
  const data = await fetchApi.delete<FormQuestion>(`/admin/question/${id}`, [
    "form-question",
  ]);
  return data;
};

export const updateQuestion = async (
  id: string,
  payload: CreateFormQuestion,
) => {
  const data = await fetchApi.put<FormQuestion>(
    `/admin/question/${id}`,
    payload,
    ["form-question"],
  );
  return data;
};
