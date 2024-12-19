import { z } from "zod";
import { Admin } from "./admin.type";
import { User } from "./user.type";
import { Session } from "./base.type";

export type AuthSession = {
  auth: Auth;
  session: Session;
};

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

export type Auth = Admin & User;

export type Login = z.infer<typeof LoginSchema>;
