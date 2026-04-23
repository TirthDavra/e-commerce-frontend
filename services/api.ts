import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// interceptors

api.interceptors.request.use(async (config) => {
  let token: string | null = null;

  if (typeof window !== "undefined") {
    const { useAuthStore } = await import("@/store/auth.store");
    token = useAuthStore.getState().token;
  } else {
    const { cookies } = await import("next/headers");
    token = (await cookies()).get("token")?.value ?? null;
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});