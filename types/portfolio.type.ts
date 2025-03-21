import { Block } from "@blocknote/core";
import { z } from "zod";
import { CategoryOnPorfolio } from "./category.type";
import { BaseFilterSchema } from "./base.type";

export type Portfolio = {
  id: string;
  admin_id: string;
  title: string;
  description: string;
  cover_url: string;
  github_link: string | null;
  preview_link: string | null;
  created_at: Date;
  updated_at: Date;
  published_at: Date | null;
  slug: string;
  gallery: string[];
  content: Block[] | null;
  CategoryOnPorfolio: CategoryOnPorfolio[];
};
export const CreatePortfolioSchema = z.object({
  admin_id: z.string().min(1, { message: "Admin ID is required" }),
  title: z.string().min(1, { message: "Title is required" }),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(200, {
      message: "Description should not be longer than 200 characters",
    }),
  slug: z.string().min(1, { message: "Slug is required" }),
  cover_url: z.string({ message: "Cover Image is required" }),
  gallery: z.array(z.string()).optional(),
  preview_link: z.string().optional(),
  github_link: z.string().optional(),
  content: z.string().optional(),
  categories: z.array(z.string()).optional(),
});

export const PortfolioFilterSchema = BaseFilterSchema.extend({
  title: z.string().optional(),
  categories: z.array(z.string()).optional(),
});

export type CreatePortfolio = z.infer<typeof CreatePortfolioSchema>;
export type PortfolioFilter = z.infer<typeof PortfolioFilterSchema>;
