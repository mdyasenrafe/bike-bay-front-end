import React from "react";
import { MainLayout } from "../../../components/layouts/MainLayout";
import {
  Contact,
  FeatureProduct,
  Hero,
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
    </MainLayout>
  );
};
