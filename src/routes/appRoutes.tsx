import { Signin, Signup } from "../pages/auth";
import { About, Home } from "../pages/main";

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
];
