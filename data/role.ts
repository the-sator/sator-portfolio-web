import { CheckRole, CreateRole, Role, UpdateRole } from "@/types/role.type";
import { fetchApi } from "@/utils/fetch-client";

export const getAllRoles = async () => {
  const data = await fetchApi.get<Role[]>("/admin/role", ["role"]);
  return data;
};

export const getRoleById = async (id: number) => {
  const data = await fetchApi.get<Role>(`/admin/role/${id}`, ["role"]);
  return data;
};

export const createRole = async (payload: CreateRole) => {
  const data = await fetchApi.post<Role[]>("/admin/role", payload, ["role"]);
  return data;
};

export const deleteRole = async (id: number) => {
  const data = await fetchApi.delete<Role[]>(`/admin/role/${id}`, ["role"]);
  return data;
};

export const updateRole = async (id: number, payload: UpdateRole) => {
  const data = await fetchApi.put<Role[]>(`/admin/role/${id}`, payload, [
    "role",
  ]);
  return data;
};

export const checkRole = async (payload: CheckRole) => {
  const data = await fetchApi.put<Role[]>(`/admin/role/`, payload, [
    "role-check",
  ]);
  return data;
};
