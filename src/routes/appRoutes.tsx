import { commonRoutes } from "./commonRoutes";
import { adminRoutes } from "./adminRoutes";
import { userRoutes } from "./userRoutes";
import { TAppRoute } from "./types";
import { AdminDashboardLayout, ProtectedRoute } from "../components/layouts";
import { NotFound } from "../pages";

export const appRoutes: TAppRoute[] = [
  ...commonRoutes,
  {
    id: 6,
    name: "Admin Dashboard",
    path: "/dashboard/admin",
    isNavItem: false,
    children: adminRoutes,
    component: (
      <ProtectedRoute roles={["admin"]}>
        <AdminDashboardLayout />
      </ProtectedRoute>
    ),
  },
  {
    id: 7,
    name: "User Dashboard",
    path: "/dashboard/user",
    isNavItem: false,
    children: userRoutes,
  },
  {
    id: 712,
    name: "Not Found",
    path: "*",
    isNavItem: false,
    component: <NotFound />,
  },
];
