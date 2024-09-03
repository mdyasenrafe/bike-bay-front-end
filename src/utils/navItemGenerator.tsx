import React from "react";
import { Link } from "react-router-dom";
import { TAppRoute } from "../routes/types";

type NavItem = {
  label: React.ReactNode;
  key: string;
  children?: NavItem[];
};

export const generateNavItems = (routes: TAppRoute[]): NavItem[] => {
  return routes.reduce((acc: NavItem[], route: TAppRoute) => {
    if (route.isNavItem && !route.children) {
      acc.push({
        label: <Link to={route.path}>{route.name}</Link>,
        key: route.path,
      });
    }

    if (route.children && route.isNavItem) {
      acc.push({
        key: route.path,
        label: <span>{route.name}</span>,
        children: route.children.map((child) => ({
          key: child.path,
          label: <Link to={child.path}>{child.name}</Link>,
        })),
      });
    }
    return acc;
  }, []);
};
