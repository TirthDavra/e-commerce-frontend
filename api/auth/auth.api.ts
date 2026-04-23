import { api } from "@/services/api";
import type { LoginInput, RegisterInput, LoginResponse, RegisterResponse } from "./types";

export async function login(body: LoginInput): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>("/auth/login", body);
  return data;
}

export async function register(body: RegisterInput): Promise<RegisterResponse> {
  const { data } = await api.post<RegisterResponse>("/auth/register", body);
  return data;
}