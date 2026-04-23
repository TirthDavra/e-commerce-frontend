import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { AdminDashboardResponse } from "@/api/admin/types";

function formatJoined(iso: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function labelRole(role: string) {
  return role.charAt(0).toUpperCase() + role.slice(1);
}

type Props = {
  data: AdminDashboardResponse | null;
  error: string | null;
};

export function AdminDashboardContent({ data, error }: Props) {
  if (error) {
    return (
      <p className="rounded-lg border border-destructive/50 bg-destructive/5 px-4 py-3 text-sm text-destructive">
        {error}
      </p>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Platform overview
        </h1>
        <p className="text-sm text-muted-foreground">
          High-level counts across users, jobs, and applications.
        </p>
      </div>

      <div>
        <h2 className="mb-3 text-sm font-medium text-muted-foreground">
          Users
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total users</CardDescription>
              <CardTitle className="text-2xl tabular-nums">
                {data.totalUsers}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Candidates</CardDescription>
              <CardTitle className="text-2xl tabular-nums">
                {data.candidateCount}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Recruiters</CardDescription>
              <CardTitle className="text-2xl tabular-nums">
                {data.recruiterCount}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Admins</CardDescription>
              <CardTitle className="text-2xl tabular-nums">
                {data.adminCount}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-sm font-medium text-muted-foreground">
          Jobs & applications
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total jobs</CardDescription>
              <CardTitle className="text-2xl tabular-nums">
                {data.totalJobs}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Open jobs</CardDescription>
              <CardTitle className="text-2xl tabular-nums">
                {data.openJobs}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Closed jobs</CardDescription>
              <CardTitle className="text-2xl tabular-nums">
                {data.closedJobs}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Applications</CardDescription>
              <CardTitle className="text-2xl tabular-nums">
                {data.totalApplications}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-medium">Recent sign-ups</h2>
        <p className="text-sm text-muted-foreground">
          Newest accounts by registration time.
        </p>
        <Card>
          <CardContent className="px-0 pt-4">
            {data.recentUsers.length === 0 ? (
              <p className="px-4 pb-4 text-sm text-muted-foreground">
                No users yet.
              </p>
            ) : (
              <ul className="divide-y">
                {data.recentUsers.map((u) => (
                  <li
                    key={u.id}
                    className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="text-sm font-medium">{u.name}</p>
                      <p className="text-sm text-muted-foreground">{u.email}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      <span>{labelRole(u.role)}</span>
                      <span>{formatJoined(u.createdAt)}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      <Separator />
    </div>
  );
}
