import { MainLayout, ProtectedRoute } from "../components/layouts";
import { Profile } from "../pages/dashboard/shared";
import { MyRental } from "../pages/dashboard/user";
import { TAppRoute } from "./types";

export const userRoutes: TAppRoute[] = [
  {
    id: 7.1,
    name: "My Rental",
    path: "/dashboard/user/my-rental",
    component: (
      <ProtectedRoute roles={["user", "admin"]}>
        <MyRental />
      </ProtectedRoute>
    ),
    isNavItem: false,
  },
  {
    id: 7.2,
    name: "Profile",
    path: "/dashboard/user/profile",
    component: (
      <ProtectedRoute roles={["user", "admin"]}>
        <MainLayout>
          <Profile />
        </MainLayout>
      </ProtectedRoute>
    ),
    isNavItem: false,
  },
];
