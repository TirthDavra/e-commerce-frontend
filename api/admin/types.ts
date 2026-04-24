export type AdminRecentUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
};

export type AdminDashboardResponse = {
  totalUsers: number;
  adminCount: number;
  userCount: number;
  totalProducts: number;
  totalOrders: number;
  recentUsers: AdminRecentUser[];
};
