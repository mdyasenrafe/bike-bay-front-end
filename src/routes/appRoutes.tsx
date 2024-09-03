import { commonRoutes } from "./commonRoutes";
import { adminRoutes } from "./adminRoutes";
import { userRoutes } from "./userRoutes";
import { TAppRoute } from "./types";

export const appRoutes: TAppRoute[] = [
  ...commonRoutes,
  {
    id: 6,
    name: "Admin Dashboard",
    path: "/dashboard/admin",
    isNavItem: false,
    children: adminRoutes,
  },
  {
    id: 7,
    name: "User Dashboard",
    path: "/dashboard/user",
    isNavItem: false,
    children: userRoutes,
  },
];
