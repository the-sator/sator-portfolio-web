"use server";

import { ADMIN_LOGIN_PATH, COOKIE } from "@/constant/base";
import { adminLogin, adminSetUpTotp, adminSignout } from "@/data/admin";
import { userlogin } from "@/data/user";
import { UpdateAdminTotpSchema } from "@/types/admin.type";
import { LoginSchema } from "@/types/auth.type";
import { deleteSessionCookies, setSessionCookies } from "@/utils/cookie";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function adminLoginAction(formData: unknown) {
  const result = LoginSchema.safeParse(formData);
  if (!result.success) {
    return {
      error: result.error.format(),
    };
  }

  const { data, error } = await adminLogin({
    email: result.data.email,
    password: result.data.password,
    otp: result.data.otp,
  });

  if (!error && data) {
    await setSessionCookies(COOKIE.ADMIN, data.token, String(data.expires_at));
    revalidatePath("/", "layout");
    redirect("/admin-panel/user");
  } else {
    return {
      error: error,
    };
  }
}

export async function adminSignoutAction(id: string) {
  const { data, error } = await adminSignout(id);
  if (!error && data) {
    await deleteSessionCookies(COOKIE.ADMIN);
    revalidatePath("/", "layout");
    redirect(ADMIN_LOGIN_PATH);
  } else {
    return {
      error: error,
    };
  }
}

export async function adminTotp(formData: unknown) {
  const result = UpdateAdminTotpSchema.safeParse(formData);
  if (!result.success) {
    return {
      error: result.error.format(),
    };
  }

  const { data, error } = await adminSetUpTotp({
    key: result.data.key,
    code: result.data.code,
  });

  if (error) {
    return { error: error };
  }

  return { data, error };
}

export async function getSessionCookies() {
  const cookieStore = await cookies();
  return cookieStore.get("session");
}

/* User */
export async function userLoginAction(formData: unknown) {
  const result = LoginSchema.safeParse(formData);
  if (!result.success) {
    return {
      error: result.error.format(),
    };
  }

  const { data, error } = await userlogin({
    email: result.data.email,
    password: result.data.password,
    otp: result.data.otp,
  });

  if (!error && data) {
    await setSessionCookies(COOKIE.USER, data.token, String(data.expires_at));
    revalidatePath("/", "layout");
    redirect("/user-panel/site");
  } else {
    return {
      error: error,
    };
  }
}
