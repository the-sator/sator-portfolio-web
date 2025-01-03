"use server";

import { adminLogin, adminSetUpTotp, adminSignout } from "@/data/admin";
import { userlogin } from "@/data/user";
import { UpdateAdminTotpSchema } from "@/types/admin.type";
import { LoginSchema } from "@/types/auth.type";
import { deleteSessionCookies, setSessionCookies } from "@/utils/session";
import { revalidatePath, revalidateTag } from "next/cache";
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
    username: result.data.username,
    otp: result.data.otp,
  });

  if (!error && data) {
    await setSessionCookies(
      "session-admin",
      data.session.token,
      String(data.session.expiredAt),
    );
    revalidatePath("/", "layout");
    revalidateTag("admin-session");
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
    await deleteSessionCookies("session-admin");
    revalidatePath("/", "layout");
    revalidateTag("admin-session");
    revalidateTag("admin");
    redirect("/admin-panel/login");
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
    id: result.data.id,
    key: result.data.key,
    sessionId: result.data.sessionId,
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
    username: result.data.username,
    otp: result.data.otp,
  });

  if (!error && data) {
    await setSessionCookies(
      "session-user",
      data.session.token,
      String(data.session.expiredAt),
    );
    revalidatePath("/", "layout");
    revalidateTag("user-session");
    redirect("/chat");
  } else {
    return {
      error: error,
    };
  }
}
