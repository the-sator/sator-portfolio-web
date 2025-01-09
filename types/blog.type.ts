import { Block } from "@blocknote/core";
import { CategoryOnBlog } from "./category.type";
import { z } from "zod";
import { BaseFilterSchema } from "./base.type";

export type Blog = {
  id: string;
  admin_id: string | null;
  site_user_id: string | null;
  title: string;
  created_at: Date;
  updated_at: Date;
  published_at: Date | null;
  slug: string;
  description: string;
  content: Block[] | null;
  cover_url: string | null;
  like: number;
  view: number;
  CategoryOnBlog: CategoryOnBlog[];
};

export const CreateBlogSchema = z.object({
  admin_id: z.string().optional(),
  site_user_id: z.string().optional(),
  title: z.string().min(1, { message: "Title is required" }),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(200, {
      message: "Description should not be longer than 200 characters",
    }),
  cover_url: z.string().optional(),
  slug: z.string().min(3, { message: "Slug must be atleast 3 characters!!" }),
  content: z.string().optional(),
  categories: z.array(z.string()).optional(),
});

export const BlogFilterSchema = BaseFilterSchema.extend({
  title: z.string().optional(),
  categories: z.array(z.string()).optional(),
});

export type CreateBlog = z.infer<typeof CreateBlogSchema>;
export type BlogFilter = z.infer<typeof BlogFilterSchema>;
