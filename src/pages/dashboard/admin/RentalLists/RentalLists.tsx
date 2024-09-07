import React from "react";
import { MainLayout } from "../../../../components/layouts";
import { Container, Text } from "../../../../components/atoms";
import { useModal } from "../../../../hooks";

export const RentalLists = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  return (
    <MainLayout>
      <Container>
        <Text>Rental List</Text>
      </Container>
    </MainLayout>
  );
};
