import React, { useMemo, useState } from "react";
import {
  useGetAllRentalsQuery,
  useGetRentals,
} from "../../../../redux/features/rental";
import { TActiveTab } from "./component/types";
import { MainLayout } from "../../../../components/layouts";
import { Container, LoadingSpinner, Text } from "../../../../components/atoms";
import Tabs from "./component/Tabs/Tabs";
import { useAppSelector } from "../../../../redux";
import { RentalList } from "./component";

export const MyRental = () => {
  // states
  const [activeTab, setActiveTab] = useState<TActiveTab>("unpaid");
  const { data, isLoading } = useGetAllRentalsQuery([]);

  const rentals = useAppSelector(useGetRentals);

  const filteredRentals = useMemo(() => {
    return rentals.filter((rental) => {
      if (activeTab === "paid") {
        return rental.status === "completed";
      } else {
        // activeTab === "unpaid"
        return rental.status === "booked" || rental.status === "returned";
      }
    });
  }, [rentals, activeTab]);
  return (
    <MainLayout>
      <Container>
        <div className="pt-10">
          <Text variant="H1" className="text-center mb-4 text-black">
            Rental Overview
          </Text>
          <Text
            variant="P3"
            style={{ textAlign: "center", maxWidth: 600, margin: "auto" }}
            className="text-black pb-16"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
            totam atque asperiores placeat aliquid minima harum pariatur iste
            officia sint?
          </Text>
        </div>
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <RentalList rentals={filteredRentals} showPayButton={true} />
        )}
      </Container>
    </MainLayout>
  );
};
