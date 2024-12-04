"use server";

import { createPortfolio, updatePortfolio } from "@/data/portfolio";
import { CreatePortfolio, CreatePortfolioSchema } from "@/types/portfolio.type";
import { revalidateTag } from "next/cache";

export const createPortfolioAction = async (formData: unknown) => {
  const result = CreatePortfolioSchema.safeParse(formData);
  if (!result.success) {
    return {
      error: result.error.format(),
    };
  }
  const payload: CreatePortfolio = {
    admin_id: result.data.admin_id,
    slug: result.data.slug,
    title: result.data.title,
    content: result.data.content,
    description: result.data.description,
    categories: result.data.categories,
    cover_url: result.data.cover_url,
    gallery: result.data.gallery,
  };
  const { data, error } = await createPortfolio(payload);
  if (error) {
    return {
      data: null,
      error: error,
    };
  }
  revalidateTag("portfolio");
  revalidateTag("portfolio-" + data!.slug);
  return { data, error };
};

export const updatePortfolioAction = async (id: string, formData: unknown) => {
  const result = CreatePortfolioSchema.safeParse(formData);
  if (!result.success) {
    return {
      error: result.error.format(),
    };
  }
  const payload: CreatePortfolio = {
    admin_id: result.data.admin_id,
    slug: result.data.slug,
    title: result.data.title,
    content: result.data.content,
    description: result.data.description,
    categories: result.data.categories,
    cover_url: result.data.cover_url,
    gallery: result.data.gallery,
  };
  const { data, error } = await updatePortfolio(id, payload);
  if (error) {
    return {
      data: null,
      error: error,
    };
  }
  revalidateTag("portfolio");
  revalidateTag("portfolio-" + data!.slug);
  return { data, error };
};
