import React, { useCallback, useState, useMemo } from "react";
import {
  TRental,
  useGetAllRentalsQuery,
} from "../../../../redux/features/rental";
import { MainLayout } from "../../../../components/layouts";
import { Container, Text } from "../../../../components/atoms";
import { useModal } from "../../../../hooks";
import { RentalCostModal, RentalTable } from "./components";

export const RentalLists: React.FC = () => {
  // states
  const [selectedRental, setSelectedRental] = useState<TRental | undefined>();
  const [pagination, setPagination] = useState<{
    page: number;
    pageSize: number;
  }>({
    page: 1,
    pageSize: 10,
  });

  // hooks
  const { data: rentals, isLoading } = useGetAllRentalsQuery([
    {
      value: pagination.page,
      name: "page",
    },
    {
      value: pagination.pageSize,
      name: "limit",
    },
    { name: "advancePaymentStatus", value: "paid" },
  ]);
  const { openModal, isModalOpen, closeModal } = useModal();

  const handleCalculateClick = useCallback(
    (rental: TRental) => {
      setSelectedRental(rental);
      openModal();
    },
    [openModal]
  );

  const handleTableChange = useCallback((paginationData: any) => {
    setPagination({
      page: paginationData.current,
      pageSize: paginationData.pageSize,
    });
  }, []);

  const rentalsData = useMemo(
    () => (rentals?.data as TRental[]) || [],
    [rentals?.data]
  );
  const rentalsMeta = useMemo(() => rentals?.meta, [rentals?.meta]);

  return (
    <MainLayout>
      <Container>
        <div>
          <Text variant="H1" className="text-center mb-4 text-black">
            Rental Mange
          </Text>
          <Text
            variant="P3"
            style={{ textAlign: "center", maxWidth: 600, margin: "auto" }}
            className="text-black pb-16"
          >
            As an admin, Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Corrupti a ipsa debitis iure animi soluta ipsam unde sapiente
            necessitatibus quod.
          </Text>
        </div>
        <RentalTable
          rentals={rentalsData}
          loading={isLoading}
          handleCalculateClick={handleCalculateClick}
          meta={rentalsMeta}
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
