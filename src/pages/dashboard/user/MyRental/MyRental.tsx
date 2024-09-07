import React, { useMemo, useState } from "react";
import {
  useGetUserRentalsQuery,
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
  const { data, isLoading } = useGetUserRentalsQuery([
    { name: "advancePaymentStatus", value: "paid" },
  ]);

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
            Manage Your Rentals
          </Text>
          <Text
            variant="P3"
            style={{ textAlign: "center", maxWidth: 600, margin: "auto" }}
            className="text-black pb-16"
          >
            Track and manage your active and completed bike rentals. Make
            payments, view your booking history, and stay updated on your rental
            status with ease.
          </Text>
        </div>
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <RentalList
            rentals={filteredRentals}
            showPayButton={activeTab === "paid" ? false : true}
          />
        )}
      </Container>
    </MainLayout>
  );
};
