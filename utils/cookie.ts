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
  // return (await cookies()).get(COOKIE.USER)!.value;
  return `${(await cookies()).get(COOKIE.USER)!.name}=${(await cookies()).get(COOKIE.USER)!.value}`;
};

export const getAdminCookie = async () => {
  return `${(await cookies()).get(COOKIE.ADMIN)!.name}=${(await cookies()).get(COOKIE.ADMIN)!.value}`;
};
