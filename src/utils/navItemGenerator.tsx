import React from "react";
import { Link } from "react-router-dom";
import { TAppRoute } from "../routes/types";
import { TUser } from "../redux/features/auth";

type NavItem = {
  label: React.ReactNode;
  key: string;
  children?: NavItem[];
};

export const generateNavItems = (
  routes: TAppRoute[],
  isMobile: boolean = false,
  user?: TUser
): NavItem[] => {
  const navItems = routes.reduce((acc: NavItem[], route: TAppRoute) => {
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

  if (isMobile && !user?._id) {
    navItems.push(
      {
        label: <Link to="/signin">Sign In</Link>,
        key: "/signin",
      },
      {
        label: <Link to="/signup">Sign Up</Link>,
        key: "/signup",
      }
    );
  }

  return navItems;
};
