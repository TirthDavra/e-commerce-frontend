import type { z } from "zod";
import { loginFormSchema, registerFormSchema } from "./schemas";

export type LoginInput = z.infer<typeof loginFormSchema>;
export type RegisterInput = z.infer<typeof registerFormSchema>;

export type UserRole = "admin" | "recruiter" | "candidate";

export type AuthUserDto = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export type LoginResponse = {
  message: string;
  token: string;
  user: AuthUserDto;
};

export type RegisterResponse = {
  message: string;
  user: AuthUserDto;
};
