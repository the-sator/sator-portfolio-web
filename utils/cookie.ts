import { COOKIE } from "@/constant/base";
import { cookies } from "next/headers";

export const setSessionCookies = async (
  name: string,
  token: string,
  expiredAt: string,
) => {
  return (await cookies()).set(name, token, {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date(expiredAt),
  });
};

export const deleteSessionCookies = async (name: string) => {
  (await cookies()).set(name, "", {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
  });
};

export const getUserCookie = async () => {
  const userCookie = (await cookies()).get(COOKIE.USER);
  return userCookie ? `${userCookie.name}=${userCookie.value}` : null;
};

export const getAdminCookie = async () => {
  const adminCookie = (await cookies()).get(COOKIE.ADMIN);
  return adminCookie ? `${adminCookie.name}=${adminCookie.value}` : null;
};
