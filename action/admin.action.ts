"use server";

import { assignRole } from "@/data/admin";
import { AssignAdminRoleSchema } from "@/types/admin.type";
import { revalidateTag } from "next/cache";

export async function adminAssignRole(formData: unknown) {
  const result = AssignAdminRoleSchema.safeParse(formData);
  if (!result.success) {
    return {
      error: result.error.format(),
    };
  }
  const { data, error } = await assignRole({
    admin_id: result.data.admin_id,
    role_id: result.data.role_id,
  });
  if (error) {
    return {
      data: null,
      error: error,
    };
  }
  revalidateTag("admin");
  revalidateTag("role");
  return { data, error };
}
