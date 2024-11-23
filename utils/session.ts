import { cookies } from "next/headers";

export const setSessionCookies = async (token: string, expiredAt: string) => {
  (await cookies()).set("session", token, {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date(expiredAt),
  });
};

export const deleteSessionCookies = async () => {
  (await cookies()).set("session", "", {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
  });
};
