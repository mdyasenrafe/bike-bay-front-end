import React, { useState } from "react";
import {
  TRental,
  useGetAllRentalsQuery,
} from "../../../../redux/features/rental";
import { MainLayout } from "../../../../components/layouts";
import { Container } from "../../../../components/atoms";
import { useModal } from "../../../../hooks";
import { RentalCostModal, RentalTable } from "./components";

export const RentalLists: React.FC = () => {
  // states
  const [selectedRental, setSelectedRental] = useState<TRental>();

  //hooks
  const { data: rentals, isLoading } = useGetAllRentalsQuery([]);
  const { openModal, isModalOpen, closeModal } = useModal();

  const handleCalculateClick = (rental: TRental) => {
    setSelectedRental(rental);
    openModal();
  };

  return (
    <MainLayout>
      <Container>
        <RentalTable
          rentals={rentals?.data as TRental[]}
          loading={isLoading}
          handleCalculateClick={handleCalculateClick}
        />
        <RentalCostModal isModalOpen={isModalOpen} closeModal={closeModal} />
      </Container>
    </MainLayout>
  );
};
