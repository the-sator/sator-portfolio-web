import { z } from "zod";

enum Role {
  USER,
  SUPER_USER,
}

export type Admin = {
  id: string;
  email: string;
  password?: string;
  username: string;
  role: Role;
  profilePictureUrl: string | null;
  lastLogin: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type AdminSession = {
  admin: Admin;
  session: {
    token: string;
    expiredAt: Date;
  };
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
  profilePictureUrl: z.string().url().nullable().optional(),
});

export type AdminLoginSchema = z.infer<typeof AdminLoginSchema>;
