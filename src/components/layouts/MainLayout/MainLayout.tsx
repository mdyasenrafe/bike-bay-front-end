import React from "react";
import { Navbar } from "../Navbar";
import { getDarkMode } from "../../../redux/features/theme";
import { useAppSelector } from "../../../redux";

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const isDarkMode = useAppSelector(getDarkMode);
  return (
    <section className={`${isDarkMode ? "dark" : ""} `}>
      <Navbar />
      <React.Fragment>
        <div>{children}</div>
      </React.Fragment>
    </section>
  );
};
