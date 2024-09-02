import { Signin, Signup } from "../pages/auth";
import { About, BikeDetail, Home, Profile } from "../pages/main";

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
    isNavItem: true,
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
    name: "profile",
    path: "/profile",
    component: <Profile />,
    isNavItem: false,
  },
  {
    id: 5,
    name: "bike-detail",
    path: "/bike-detail/:productId",
    component: <BikeDetail />,
    isNavItem: false,
  },
];
