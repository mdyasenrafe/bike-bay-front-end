import { createBrowserRouter } from "react-router-dom";
import { appRoutes, AppRoute } from "./appRoutes";

const convertToRouteConfig = (route: AppRoute) => {
  const config: any = {
    path: route.path,
    element: route.component,
  };

  if (route.children) {
    config.children = route.children.map(convertToRouteConfig);
  }

  return config;
};

const routerConfig = appRoutes.map(convertToRouteConfig);

export const router = createBrowserRouter(routerConfig);
