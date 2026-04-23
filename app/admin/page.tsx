import { AdminDashboardContent } from "@/components/admin-dashboard-content";
import { getAdminDashboard } from "@/api/admin/dashboard.api";
import { getApiErrorMessage } from "@/lib/api-error";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  let data = null;
  let error: string | null = null;

  try {
    data = await getAdminDashboard();
  } catch (err) {
    error = getApiErrorMessage(
      err,
      "Could not load admin overview. Try refreshing."
    );
  }

  return <AdminDashboardContent data={data} error={error} />;
}
