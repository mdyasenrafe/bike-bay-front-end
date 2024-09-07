// RentalLists.tsx
import React, { useState } from "react";
import {
  TRental,
  useCalculateRentalCostMutation,
  useGetAllRentalsQuery,
} from "../../../../redux/features/rental";
import { MainLayout } from "../../../../components/layouts";
import { Container } from "../../../../components/atoms";
import { useModal } from "../../../../hooks";
import { RentalCostModal, RentalTable } from "./components";

export const RentalLists: React.FC = () => {
  const { data: rentals, isLoading } = useGetAllRentalsQuery([]);
  const { openModal, isModalOpen, closeModal } = useModal();
  const [selectedRental, setSelectedRental] = useState<string | null>(null);
  const [calculateRentalCost] = useCalculateRentalCostMutation();

  const handleCalculateClick = (rentalId: string) => {
    setSelectedRental(rentalId);
    openModal();
  };

  return (
    <MainLayout>
      <Container>
        <RentalTable
          rentals={rentals?.data as TRental[]}
          loading={isLoading}
          onCalculateClick={handleCalculateClick}
        />
        <RentalCostModal isModalOpen={isModalOpen} closeModal={closeModal} />
      </Container>
    </MainLayout>
  );
};
