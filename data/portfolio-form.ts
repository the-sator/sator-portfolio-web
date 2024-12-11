import { PaginateResult } from "@/types/base.type";
import {
  CreateFormQuestion,
  FormQuestion,
  PortfolioFormFilter,
} from "@/types/portfolio-form.type";
import { fetchApi } from "@/utils/fetch-client";
import { toQueryString } from "@/utils/string";

export const getAllQuestions = async () => {
  const data = await fetchApi.get<FormQuestion[]>("/admin/question/all", [
    "form-question",
  ]);
  return data;
};

export const getPagination = async (filter: PortfolioFormFilter) => {
  const fullUrl = `/admin/question${toQueryString({ ...filter })}`;
  const { data, error } = await fetchApi.get<PaginateResult<FormQuestion[]>>(
    fullUrl,
    ["form-question"],
  );
  if (error) {
    return { data: null, metadata: null, error };
  }

  return {
    data: data?.data || null,
    metadata: data?.metadata || null,
    error: null,
  };
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
