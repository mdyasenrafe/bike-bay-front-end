import React from "react";
import { Navbar } from "../Navbar";
import { getDarkMode } from "../../../redux/features/theme";
import { useAppSelector } from "../../../redux";
import { useLocation } from "react-router-dom";
import { adminRoutes } from "../../../routes";

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const isDarkMode = useAppSelector(getDarkMode);
  const location = useLocation();

  const routesWithoutNavbar = adminRoutes.map((route) => route.path);

  const shouldHideNavbar = routesWithoutNavbar.includes(location.pathname);
  return (
    <section className={`${isDarkMode ? "dark" : ""} `}>
      {!shouldHideNavbar && <Navbar />}
      <React.Fragment>
        <div>{children}</div>
      </React.Fragment>
    </section>
  );
};
