import React, { useCallback, useState } from "react";
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
  const [pagination, setPagination] = useState<{
    page: number;
    pageSize: number;
  }>({
    page: 1,
    pageSize: 10,
  });

  //hooks
  const { data: rentals, isLoading } = useGetAllRentalsQuery([
    {
      value: pagination.page,
      name: "page",
    },
    {
      value: pagination.pageSize,
      name: "limit",
    },
  ]);
  const { openModal, isModalOpen, closeModal } = useModal();

  const handleCalculateClick = (rental: TRental) => {
    setSelectedRental(rental);
    openModal();
  };

  const handleTableChange = useCallback((paginationData: any) => {
    setPagination({
      page: paginationData.current,
      pageSize: paginationData.pageSize,
    });
  }, []);

  return (
    <MainLayout>
      <Container>
        <RentalTable
          rentals={rentals?.data as TRental[]}
          loading={isLoading}
          handleCalculateClick={handleCalculateClick}
          meta={rentals?.meta}
          onTableChange={handleTableChange}
        />
        <RentalCostModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          selectedRental={selectedRental as TRental}
        />
      </Container>
    </MainLayout>
  );
};
