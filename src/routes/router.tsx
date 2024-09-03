import { createBrowserRouter } from "react-router-dom";
import { appRoutes, TAppRoute } from "./";

const convertToRouteConfig = (route: TAppRoute) => {
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
