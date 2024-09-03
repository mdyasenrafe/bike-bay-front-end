import { Signin, Signup } from "../pages/auth";
import {
  BikeManagement,
  CouponManagement,
  ReturnBike,
  UserManagement,
} from "../pages/dashboard/admin";
import { Profile } from "../pages/dashboard/shared";
import { MyRental } from "../pages/dashboard/user";
import { About, BikeDetail, Home } from "../pages/main";

export type AppRoute = {
  id: number;
  name: string;
  path: string;
  component?: React.ReactNode;
  isNavItem: boolean;
  children?: AppRoute[];
};

export const appRoutes: AppRoute[] = [
  {
    id: 1,
    name: "Home",
    path: "/",
    component: <Home />,
    isNavItem: true,
  },
  {
    id: 2,
    name: "About",
    path: "/about",
    component: <About />,
    isNavItem: true,
  },
  {
    id: 3,
    name: "signup",
    path: "/signup",
    component: <Signup />,
    isNavItem: false,
  },
  {
    id: 4,
    name: "signin",
    path: "/signin",
    component: <Signin />,
    isNavItem: false,
  },
  {
    id: 5,
    name: "bike-detail",
    path: "/bike-detail/:productId",
    component: <BikeDetail />,
    isNavItem: false,
  },
  {
    id: 6,
    name: "Admin Dashboard",
    path: "/dashboard/admin",
    isNavItem: false,
    children: [
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
    ],
  },
  {
    id: 7,
    name: "User Dashboard",
    path: "/dashboard/user",
    isNavItem: false,
    children: [
      {
        id: 7.1,
        name: "My Rental",
        path: "/dashboard/user/my-rental",
        component: <MyRental />,
        isNavItem: false,
      },
      {
        id: 7.2,
        name: "Profile",
        path: "/dashboard/user/profile",
        component: <Profile />,
        isNavItem: false,
      },
    ],
  },
];
