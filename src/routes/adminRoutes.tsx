import {
  BikeManagement,
  CreateProduct,
  EditProduct,
  RentalLists,
  UserManagement,
  CouponManagement,
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
    name: "Profile",
    path: "/dashboard/admin/profile",
    component: <Profile />,
    isNavItem: false,
    isSidebar: true,
  },
  {
    id: 6.3,
    name: "Bike Management",
    path: "/dashboard/admin/bike-management",
    component: <BikeManagement />,
    isNavItem: false,
    isSidebar: true,
  },
  {
    id: 6.4,
    name: "User Management",
    path: "/dashboard/admin/user-management",
    component: <UserManagement />,
    isNavItem: false,
    isSidebar: true,
  },
  {
    id: 6.5,
    name: "Rental Lists",
    path: "/dashboard/admin/rental-lists",
    component: <RentalLists />,
    isNavItem: false,
    isSidebar: true,
  },
  {
    id: 6.6,
    name: "Coupon Management",
    path: "/dashboard/admin/coupon-management",
    component: <CouponManagement />,
    isNavItem: false,
    isSidebar: true,
  },
  {
    id: 6.7,
    name: "Create Product",
    path: "/dashboard/admin/create-bike",
    component: <CreateProduct />,
    isNavItem: false,
    isSidebar: false,
  },
  {
    id: 6.8,
    name: "Update Product",
    path: "/dashboard/admin/edit/:productId",
    component: <EditProduct />,
    isNavItem: false,
    isSidebar: false,
  },
];
