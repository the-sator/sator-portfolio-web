"use server";

import { createSiteUser } from "@/data/site-user";
import { CreateSiteUserSchema } from "@/types/site-user.type";
import { revalidateTag } from "next/cache";

export const createSiteUserAction = async (formData: unknown) => {
  const result = CreateSiteUserSchema.safeParse(formData);
  if (!result.success) {
    return {
      error: result.error.format(),
    };
  }
  const { data, error } = await createSiteUser({
    email: result.data.email,
    password: result.data.password,
    username: result.data.username,
  });

  if (error) {
    return {
      data: null,
      error: error,
    };
  }
  revalidateTag("site-users");
  return { data, error };
};
