import { Home } from "../pages/main";

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
];
