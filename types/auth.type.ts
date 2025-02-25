import { z } from "zod";
export const LoginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, { message: "Username is required" })
    .max(20, {
      message: "Username must not exceed 20 characters",
    }),
  email: z.string().email({ message: "Invalid email format" }),
  otp: z.number().lt(999999, { message: "Must be 6 characters long" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export type Auth = {
  id: string;
  email: string;
  password: string;
  totp_key: Uint8Array | null;
  last_login: Date | null;
  created_at: Date;
  updated_at: Date;
};

export type Login = z.infer<typeof LoginSchema>;
