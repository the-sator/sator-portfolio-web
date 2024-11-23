"use server";

import { adminLogin, adminSignout } from "@/data/admin";
import { AdminLoginSchema } from "@/types/admin.type";
import { deleteSessionCookies, setSessionCookies } from "@/utils/session";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function login(formData: unknown) {
  const result = AdminLoginSchema.safeParse(formData);
  if (!result.success) {
    return {
      error: result.error.format(),
    };
  }

  const { data, error } = await adminLogin({
    email: result.data.email,
    password: result.data.password,
    username: result.data.username,
  });
  if (!error && data) {
    await setSessionCookies(data.session.token, String(data.session.expiredAt));
    revalidatePath("/", "layout");
    revalidateTag("admin");
    redirect("/admin/user");
  } else {
    return {
      error: error,
    };
  }
}

export async function signout() {
  const { data, error } = await adminSignout();
  if (!error && data) {
    await deleteSessionCookies();
    revalidatePath("/", "layout");
    revalidateTag("admin-session");
    revalidateTag("admin");
    redirect("/admin/login");
  } else {
    return {
      error: error,
    };
  }
}
