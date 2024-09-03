import { Profile } from "../pages/dashboard/shared";
import { MyRental } from "../pages/dashboard/user";
import { TAppRoute } from "./types";

export const userRoutes: TAppRoute[] = [
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
];
