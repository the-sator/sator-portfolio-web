import { z } from "zod";
import { BaseFilterSchema, Session } from "./base.type";

export type User = {
  id: string;
  email: string;
  password: string;
  username: string;
  profile_url: string | null;
  totp_key: Buffer | null;
  last_login: Date | null;
  created_at: Date;
  updated_at: Date;
};

export const CreateUserSchema = z.object({
  username: z.string().trim().min(1).max(20, {
    message: "Username must not exceeed 20 characters",
  }),
  email: z.string().email(),
  // otp: z.number().lt(999999, { message: "Must be 6 characters long" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const UserFilterSchema = BaseFilterSchema.extend({
  username: z.string().optional(),
  email: z.string().optional(),
});

export type UserFilter = z.infer<typeof UserFilterSchema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
