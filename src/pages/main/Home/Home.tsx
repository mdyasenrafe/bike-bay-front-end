import React from "react";
import { MainLayout } from "../../../components/layouts/MainLayout";
import { Contact, Hero, Testimonials, WhyChooseUs } from "./components";

export const Home = () => {
  return (
    <MainLayout>
      <Hero />
      <Testimonials />
      <WhyChooseUs />
      <Contact />
    </MainLayout>
  );
};
