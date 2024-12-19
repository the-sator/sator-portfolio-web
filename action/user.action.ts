"use server";

import { createUser } from "@/data/user";
import { CreateUserSchema } from "@/types/user.type";
import { revalidateTag } from "next/cache";

export const createUserAction = async (formData: unknown) => {
  const result = CreateUserSchema.safeParse(formData);
  if (!result.success) {
    return {
      error: result.error.format(),
    };
  }
  const { data, error } = await createUser({
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
  revalidateTag("users");
  return { data, error };
};
