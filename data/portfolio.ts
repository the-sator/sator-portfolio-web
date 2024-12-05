import { CreatePortfolio, Portfolio } from "@/types/portfolio.type";
import { fetchApi } from "@/utils/fetch-client";

export const getPortfolioBySlug = async (slug: string) => {
  const data = await fetchApi.get<Portfolio>(`/admin/portfolio/${slug}`, [
    `portfolio-${slug}`,
  ]);
  return data;
};

export const getAllPortfolio = async () => {
  const data = await fetchApi.get<Portfolio[]>(`/admin/portfolio`, [
    `portfolio`,
  ]);
  return data;
};

export const createPortfolio = async (payload: CreatePortfolio) => {
  const data = await fetchApi.post<Portfolio>(`/admin/portfolio/`, payload, [
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
