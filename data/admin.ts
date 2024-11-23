import { Admin, AdminLoginSchema, AdminSession } from "@/types/admin.type";
import { fetchApi } from "@/utils/fetch-client";
import { deleteSessionCookies } from "@/utils/session";
import { cache } from "react";

export const getAllAdmins = async () => {
  const data = await fetchApi.get<Admin>("/admin", ["admin"]);
  return data;
};

export const adminLogin = async (payload: AdminLoginSchema) => {
  const { data, error } = await fetchApi.post<AdminSession>(
    "/admin/login",
    payload,
    ["admin"],
  );
  return { data, error };
};

export const getAdminSession = cache(async () => {
  const { data, error } = await fetchApi.get<AdminSession>("/admin/session", [
    "admin-session",
  ]);
  return { data, error };
});

export const adminSignout = async () => {
  const { data, error } = await fetchApi.post("/admin/signout", [
    "admin-session",
  ]);
  return { data, error };
};
