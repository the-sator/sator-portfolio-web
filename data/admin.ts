import {
  Admin,
  AdminLoginSchema,
  AssignAdminRole,
  UpdateAdminTotp,
} from "@/types/admin.type";
import { Session } from "@/types/base.type";
import { fetchApi } from "@/utils/fetch-client";
import { cache } from "react";
const getAdminPath = () => {
  return `/admin`;
};

export const getAllAdmins = async () => {
  const data = await fetchApi.get<Admin[]>(`${getAdminPath()}`, ["admin"]);
  return data;
};

export const adminLogin = async (payload: AdminLoginSchema) => {
  const { data, error } = await fetchApi.post<Admin & Session>(
    `${getAdminPath()}/login`,
    payload,
    ["admin"],
  );
  return { data, error };
};

export const getAdminSession = cache(async () => {
  const { data, error } = await fetchApi.get<Admin & Session>(
    `${getAdminPath()}/me`,
    ["admin-session"],
  );

  return { data, error };
});

export const adminSignout = async (id: string) => {
  const { data, error } = await fetchApi.post(
    `${getAdminPath()}/signout`,
    { id },
    ["admin-session"],
  );
  return { data, error };
};

export const adminSetUpTotp = async (payload: UpdateAdminTotp) => {
  const { data, error } = await fetchApi.post<Admin>(
    `${getAdminPath()}/totp`,
    payload,
    ["admin-session"],
  );
  return { data, error };
};

export const assignRole = async (payload: AssignAdminRole) => {
  const { data, error } = await fetchApi.post<Admin>(
    `${getAdminPath()}/assign`,
    payload,
    ["admin-role"],
  );
  return { data, error };
};
