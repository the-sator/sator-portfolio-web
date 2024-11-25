import {
  Admin,
  AdminLoginSchema,
  AdminSession,
  UpdateAdminTotp,
} from "@/types/admin.type";
import { fetchApi } from "@/utils/fetch-client";
import { cache } from "react";

export const getAllAdmins = async () => {
  const data = await fetchApi.get<Admin[]>("/admin", ["admin"]);
  return data;
};

export const adminLogin = async (payload: AdminLoginSchema) => {
  console.log("payload:", payload);
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
  const { admin, session } = data || {};

  return { admin, session, error };
});

export const adminSignout = async (id: string) => {
  const { data, error } = await fetchApi.post("/admin/signout", { id }, [
    "admin-session",
  ]);
  return { data, error };
};

export const adminSetUpTotp = async (payload: UpdateAdminTotp) => {
  const { data, error } = await fetchApi.post<Admin>("/admin/totp", payload, [
    "admin-session",
  ]);
  return { data, error };
};
