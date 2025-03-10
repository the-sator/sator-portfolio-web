"use server";

import { createRole, deleteRole, getRoleById, updateRole } from "@/data/role";
import { CreateRoleSchema, UpdateRoleSchema } from "@/types/role.type";
import { revalidateTag } from "next/cache";

export async function adminCreateRole(formData: unknown) {
  const result = CreateRoleSchema.safeParse(formData);
  if (!result.success) {
    return {
      error: result.error.format(),
    };
  }

  const { data, error } = await createRole({
    permissions: result.data.permissions,
    name: result.data.name,
  });
  if (error) {
    return {
      data: null,
      error: error,
    };
  }
  revalidateTag("role");
  return { data, error };
}

export async function adminDeleteRole(id: number) {
  const { data, error } = await deleteRole(id);
  if (error) {
    return {
      data: null,
      error: error,
    };
  }
  revalidateTag("role");
  return { data, error };
}

export async function adminUpdateRole(id: number, formData: unknown) {
  const result = UpdateRoleSchema.safeParse(formData);
  if (!result.success) {
    return {
      error: result.error.format(),
    };
  }
  const { data, error } = await updateRole(id, {
    permissions: result.data.permissions,
  });
  if (error) {
    return {
      data: null,
      error: error,
    };
  }
  revalidateTag("role");
  return { data, error };
}

export async function adminRoleById(id: number) {
  try {
    const { data, error } = await getRoleById(id);
    if (error) throw error.message;
    return data;
  } catch (error) {
    throw error;
  }
}
