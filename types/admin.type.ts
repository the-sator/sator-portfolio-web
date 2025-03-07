import { z } from "zod";
import { Role } from "./role.type";
import { Auth } from "./auth.type";

export type Admin = {
  id: string;
  username: string;
  auth_id: string;
  auth: Auth | null;
  role_id: number;
  role: Role;
  profile_url: string | null;
  created_at: Date;
  updated_at: Date;
  totp_key: Buffer | null;
};

export const AdminLoginSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  otp: z.number().lt(999999, { message: "Must be 6 characters long" }),
  profilePictureUrl: z.string().url().nullable().optional(),
});

export const UpdateAdminTotpSchema = z.object({
  id: z.string().trim().min(1, { message: "Admin ID is required" }),

  key: z.string().trim().min(1, { message: "Key is required" }),
  code: z.string().trim().min(1, { message: "Code is required" }),
});

export const AssignAdminRoleSchema = z.object({
  role_id: z.number().min(1, { message: "Role ID is Required" }),
  admin_id: z.string().min(1, { message: "Admin ID is Required" }),
});

export type AdminLoginSchema = z.infer<typeof AdminLoginSchema>;
export type UpdateAdminTotp = z.infer<typeof UpdateAdminTotpSchema>;
export type AssignAdminRole = z.infer<typeof AssignAdminRoleSchema>;
