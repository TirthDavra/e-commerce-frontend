export type AdminRecentUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
};

export type AdminDashboardResponse = {
  totalUsers: number;
  recruiterCount: number;
  candidateCount: number;
  adminCount: number;
  totalJobs: number;
  openJobs: number;
  closedJobs: number;
  totalApplications: number;
  recentUsers: AdminRecentUser[];
};
