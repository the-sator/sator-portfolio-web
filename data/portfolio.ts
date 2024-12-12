import { PaginateResult } from "@/types/base.type";
import {
  CreatePortfolio,
  Portfolio,
  PortfolioFilter,
} from "@/types/portfolio.type";
import { fetchApi } from "@/utils/fetch-client";
import { toQueryString } from "@/utils/string";

export const getPortfolioBySlug = async (slug: string) => {
  const data = await fetchApi.get<Portfolio>(`/admin/portfolio/${slug}`, [
    `portfolio-${slug}`,
  ]);
  return data;
};

export const paginatePortfolio = async (filter?: PortfolioFilter) => {
  const fullUrl = `/admin/portfolio${toQueryString({ ...filter })}`;
  const { data, error } = await fetchApi.get<PaginateResult<Portfolio[]>>(
    fullUrl,
    [`portfolio`],
  );
  if (!data) {
    return { data: null, page: null, error };
  }
  return { data: data?.data, page: data?.metadata.page, error };
};

export const createPortfolio = async (payload: CreatePortfolio) => {
  const data = await fetchApi.post<Portfolio>(`/admin/portfolio`, payload, [
    "portfolio",
  ]);
  return data;
};

export const updatePortfolio = async (id: string, payload: CreatePortfolio) => {
  const data = await fetchApi.put<Portfolio>(
    `/admin/portfolio/${id}`,
    payload,
    ["portfolio"],
  );
  return data;
};

export const deletePortfolio = async (id: string) => {
  const data = await fetchApi.delete<Portfolio>(`/admin/portfolio/${id}`, [
    "portfolio",
  ]);
  return data;
};

export const publishPortfolio = async (id: string) => {
  const data = await fetchApi.post<Portfolio>(
    `/admin/portfolio/${id}/publish`,
    ["portfolio"],
  );
  return data;
};

export const unpublishPortfolio = async (id: string) => {
  const data = await fetchApi.post<Portfolio>(
    `/admin/portfolio/${id}/unpublish`,
    ["portfolio"],
  );
  return data;
};
