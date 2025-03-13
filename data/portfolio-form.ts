import { PaginateResult } from "@/types/base.type";
import {
  CreateFormAttempt,
  CreateFormQuestion,
  FormAttempt,
  FormAttemptFilter,
  FormQuestion,
  FormQuestionPagination,
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

export const getQuestionById = async (id = "first") => {
  const data = await fetchApi.get<FormQuestionPagination>(`/question/${id}`, [
    "form-question",
  ]);
  console.log("data:", data);
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

// Attempt and Response
export const getAttemptById = async (id: string) => {
  const data = await fetchApi.get<FormAttempt>(`/form-attempt/${id}`, [
    `form-attempt:${id}`,
  ]);
  return data;
};

export const createFormAttempt = async (payload: CreateFormAttempt) => {
  const data = await fetchApi.post<FormAttempt>(`/form-attempt`, payload, [
    `form-attempt`,
  ]);
  return data;
};

export const paginateAttemptByUser = async (filter?: FormAttemptFilter) => {
  const fullUrl = `/form-attempt${toQueryString({ ...filter })}`;
  const { data, error } = await fetchApi.get<PaginateResult<FormAttempt[]>>(
    fullUrl,
    [`form-attempt`],
  );

  if (error) {
    return { data: null, error };
  }

  return {
    data: data?.data || null,
    metadata: data?.metadata || null,
    error: null,
  };
};
