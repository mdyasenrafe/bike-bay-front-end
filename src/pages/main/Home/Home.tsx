import React from "react";
import { MainLayout } from "../../../components/layouts";
import {
  Contact,
  FeatureProduct,
  Hero,
  SpinWheel,
  Testimonials,
  WhyChooseUs,
} from "./components";

export const Home = () => {
  return (
    <MainLayout>
      <Hero />
      <FeatureProduct />
      <Testimonials />
      <WhyChooseUs />
      <Contact />
      <SpinWheel />
    </MainLayout>
  );
};
