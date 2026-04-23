import { api } from "@/services/api";
import type { AdminDashboardResponse } from "./types";

export async function getAdminDashboard(): Promise<AdminDashboardResponse> {
  const { data } = await api.get<AdminDashboardResponse>("/admin/dashboard");
  return data;
}
