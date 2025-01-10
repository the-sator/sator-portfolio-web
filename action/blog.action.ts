"use server";
import {
  createBlog,
  deleteBlog,
  increaseViewBlog,
  paginateBlog,
  publishBlog,
  unpublishBlog,
  updateBlog,
} from "@/data/blog";
import { BlogFilter, CreateBlog, CreateBlogSchema } from "@/types/blog.type";
import { revalidateTag } from "next/cache";

export const getBlogPaginationAction = async (filter: BlogFilter) => {
  const { data, page } = await paginateBlog(filter);

  return { data, page };
};

export const createBlogAction = async (formData: unknown) => {
  const result = CreateBlogSchema.safeParse(formData);
  if (!result.success) {
    return {
      error: result.error.format(),
    };
  }
  const payload: CreateBlog = {
    admin_id: result.data.admin_id,
    slug: result.data.slug,
    title: result.data.title,
    content: result.data.content,
    description: result.data.description,
    categories: result.data.categories,
    cover_url: result.data.cover_url,
  };
  const { data, error } = await createBlog(payload);
  if (error) {
    return {
      data: null,
      error: error,
    };
  }
  revalidateTag("blog");
  revalidateTag("blog-" + data!.slug);
  return { data, error };
};

export const updateBlogAction = async (id: string, formData: unknown) => {
  const result = CreateBlogSchema.safeParse(formData);
  if (!result.success) {
    return {
      error: result.error.format(),
    };
  }
  const payload: CreateBlog = {
    admin_id: result.data.admin_id,
    slug: result.data.slug,
    title: result.data.title,
    content: result.data.content,
    description: result.data.description,
    categories: result.data.categories,
    cover_url: result.data.cover_url,
  };
  const { data, error } = await updateBlog(id, payload);
  if (error) {
    return {
      data: null,
      error: error,
    };
  }
  revalidateTag("blog");
  revalidateTag("blog-" + data!.slug);
  return { data, error };
};

export const deleteBlogAction = async (id: string) => {
  const { data, error } = await deleteBlog(id);
  if (error) {
    return {
      data: null,
      error: error,
    };
  }
  revalidateTag("blog");
  return { data, error };
};

export const publishBlogAction = async (id: string) => {
  const { data, error } = await publishBlog(id);
  if (error) {
    return {
      data: null,
      error: error,
    };
  }
  revalidateTag("blog");
  return { data, error };
};

export const unpublishBlogAction = async (id: string) => {
  const { data, error } = await unpublishBlog(id);
  if (error) {
    return {
      data: null,
      error: error,
    };
  }
  revalidateTag("blog");
  return { data, error };
};

export const increaseViewBlogAction = async (slug: string) => {
  const { data, error } = await increaseViewBlog(slug);
  if (error) {
    return {
      data: null,
      error: error,
    };
  }
  return { data, error };
};
