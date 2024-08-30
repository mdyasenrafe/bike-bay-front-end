import React from "react";
import { MainLayout } from "../../../components/layouts/MainLayout";
import { Hero, Testimonials } from "./components";

export const Home = () => {
  return (
    <MainLayout>
      <Hero />
      <Testimonials />
    </MainLayout>
  );
};
