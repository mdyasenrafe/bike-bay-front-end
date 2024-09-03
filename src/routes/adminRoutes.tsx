import {
  BikeManagement,
  CouponManagement,
  ReturnBike,
  UserManagement,
} from "../pages/dashboard/admin";
import { Profile } from "../pages/dashboard/shared";
import { TAppRoute } from "./types";

export const adminRoutes: TAppRoute[] = [
  {
    id: 6.1,
    name: "Dashboard",
    path: "/dashboard/admin",
    component: <Profile />,
    isNavItem: false,
    isSidebar: false,
  },
  {
    id: 6.2,
    name: "Bike Management",
    path: "/dashboard/admin/bike-management",
    component: <BikeManagement />,
    isNavItem: false,
    isSidebar: true,
  },
  {
    id: 6.3,
    name: "Coupon Management",
    path: "/dashboard/admin/coupon-management",
    component: <CouponManagement />,
    isNavItem: false,
    isSidebar: true,
  },
  {
    id: 6.4,
    name: "Return Bike",
    path: "/dashboard/admin/return-bike",
    component: <ReturnBike />,
    isNavItem: false,
    isSidebar: true,
  },
  {
    id: 6.5,
    name: "Profile",
    path: "/dashboard/admin/profile",
    component: <Profile />,
    isNavItem: false,
    isSidebar: true,
  },
  {
    id: 6.6,
    name: "User Management",
    path: "/dashboard/admin/user-management",
    component: <UserManagement />,
    isNavItem: false,
    isSidebar: true,
  },
];
