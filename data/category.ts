import { Category, CreateCategory } from "@/types/category.type";
import { fetchApi } from "@/utils/fetch-client";

export const getAllCategories = async () => {
  const data = await fetchApi.get<Category[]>("/admin/category", ["category"]);
  return data;
};

export const createCategory = async (payload: CreateCategory) => {
  const data = await fetchApi.post<Category>("/admin/category", payload, [
    "category",
  ]);
  return data;
};

export const updateCategory = async (id: string, payload: CreateCategory) => {
  const data = await fetchApi.put<Category>(`/admin/category/${id}`, payload, [
    "category",
  ]);
  return data;
};

export const deleteCategory = async (id: string) => {
  const data = await fetchApi.delete<Category>(`/admin/category/${id}`, [
    "category",
  ]);
  return data;
};
