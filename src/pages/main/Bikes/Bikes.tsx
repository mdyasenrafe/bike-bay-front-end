import React from "react";
import { MainLayout } from "../../../components/layouts";
import { Container, Text } from "../../../components/atoms";
import { BikesLayout } from "../../../components";

export const Bikes: React.FC = () => {
  return (
    <MainLayout>
      <Container>
        <div className="pt-10">
          <Text variant="H1" className="text-center mb-4 text-black">
            Browse Our Bike Collection
          </Text>
          <Text
            variant="P3"
            style={{ textAlign: "center", maxWidth: 600, margin: "auto" }}
            className="text-black pb-16"
          >
            Explore all available bikes for rent. Use the search and filter
            options to find the perfect bike that suits your needs. Whether
            you're looking for a mountain bike or a road bike, we've got you
            covered!
          </Text>
        </div>
        <BikesLayout />
      </Container>
    </MainLayout>
  );
};
