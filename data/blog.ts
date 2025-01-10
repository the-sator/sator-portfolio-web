import { PaginateResult } from "@/types/base.type";
import { Blog, BlogFilter, CreateBlog } from "@/types/blog.type";
import { fetchApi } from "@/utils/fetch-client";
import { toQueryString } from "@/utils/string";

const getPath = () => {
  return `/blog`;
};

const getAdminPath = () => {
  return `/admin/blog`;
};

export const findAllBlog = async (filter?: BlogFilter) => {
  const fullUrl = `${getPath()}/${toQueryString({ ...filter })}`;
  const { data, error } = await fetchApi.get<Blog[]>(fullUrl, [`blog`]);
  if (!data) {
    return { data: null, error };
  }
  return { data, error };
};
export const paginateBlog = async (filter?: BlogFilter) => {
  const fullUrl = `${getAdminPath()}/${toQueryString({ ...filter })}`;
  const { data, error } = await fetchApi.get<PaginateResult<Blog[]>>(fullUrl, [
    `blog`,
  ]);
  if (!data) {
    return { data: null, page: null, error };
  }
  return { data: data?.data, page: data?.metadata.page, error };
};

export const getBlogBySlug = async (slug: string, isAdmin = false) => {
  const endpoint = isAdmin ? getAdminPath() : getPath();
  const { data, error } = await fetchApi.get<Blog>(`${endpoint}/${slug}`, [
    `blog-${slug}`,
  ]);
  if (!data) {
    return { data: null, page: null, error };
  }
  return { data, error };
};

export const createBlog = async (payload: CreateBlog) => {
  const data = await fetchApi.post<Blog>(`${getAdminPath()}`, payload, [
    "blog",
  ]);
  return data;
};

export const updateBlog = async (id: string, payload: CreateBlog) => {
  const data = await fetchApi.put<Blog>(`${getAdminPath()}/${id}`, payload, [
    "blog",
  ]);
  return data;
};

export const deleteBlog = async (id: string) => {
  const data = await fetchApi.delete<Blog>(`${getAdminPath()}/${id}`, ["blog"]);
  return data;
};

export const publishBlog = async (id: string) => {
  const data = await fetchApi.post<Blog>(`${getAdminPath()}/${id}/publish`, [
    "blog",
  ]);
  return data;
};

export const unpublishBlog = async (id: string) => {
  const data = await fetchApi.post<Blog>(`${getAdminPath()}/${id}/unpublish`, [
    "blog",
  ]);
  return data;
};

export const increaseViewBlog = async (slug: string) => {
  const data = await fetchApi.post<Blog>(`${getPath()}/${slug}/view`, ["blog"]);
  return data;
};
