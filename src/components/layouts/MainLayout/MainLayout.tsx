import React from "react";
import { Navbar } from "../Navbar";

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <React.Fragment>
      <Navbar />
      <React.Fragment>{children}</React.Fragment>
    </React.Fragment>
  );
};
