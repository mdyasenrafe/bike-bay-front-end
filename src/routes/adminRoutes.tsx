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
    name: "Bike Management",
    path: "/dashboard/admin/bike-management",
    component: <BikeManagement />,
    isNavItem: false,
  },
  {
    id: 6.2,
    name: "Coupon Management",
    path: "/dashboard/admin/coupon-management",
    component: <CouponManagement />,
    isNavItem: false,
  },
  {
    id: 6.3,
    name: "Return Bike",
    path: "/dashboard/admin/return-bike",
    component: <ReturnBike />,
    isNavItem: false,
  },
  {
    id: 6.4,
    name: "Profile",
    path: "/dashboard/admin/profile",
    component: <Profile />,
    isNavItem: false,
  },
  {
    id: 6.5,
    name: "User Management",
    path: "/dashboard/admin/user-management",
    component: <UserManagement />,
    isNavItem: false,
  },
];
