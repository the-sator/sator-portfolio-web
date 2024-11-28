import { z } from "zod";
import { Session } from "./base.type";
import { Role } from "./role.type";

export type Admin = {
  id: string;
  email: string;
  password?: string;
  username: string;
  role_id: number;
  role: Role;
  profilePictureUrl: string | null;
  lastLogin: Date | null;
  createdAt: Date;
  updatedAt: Date;
  totp_key: Buffer | null;
};

export type AdminSession = {
  admin: Admin;
  session: Session;
};

export const AdminLoginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, { message: "Username is required" })
    .max(20, {
      message: "Username must not exceed 20 characters",
    }),
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
  sessionId: z.string().trim().min(1, { message: "Session ID is required" }),
});

export const AssignAdminRoleSchema = z.object({
  role_id: z.number().min(1, { message: "Role ID is Required" }),
  admin_id: z.string().min(1, { message: "Admin ID is Required" }),
});

export type AdminLoginSchema = z.infer<typeof AdminLoginSchema>;
export type UpdateAdminTotp = z.infer<typeof UpdateAdminTotpSchema>;
export type AssignAdminRole = z.infer<typeof AssignAdminRoleSchema>;
