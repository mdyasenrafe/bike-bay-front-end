import React, { useCallback, useState } from "react";
import { TRental } from "../../../../../../redux/features/rental";
import { Text } from "../../../../../../components/atoms";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { renderRentalEmptyMessage } from "../../../../../../utils";
import { PayModal, RentalCards } from "./components";
import { useModal } from "../../../../../../hooks";

dayjs.extend(relativeTime);

type RentalListProps = {
  rentals: TRental[];
  showPayButton: boolean;
};

export const RentalList: React.FC<RentalListProps> = ({
  rentals,
  showPayButton,
}) => {
  const [selectedRental, setSelectedRental] = useState<TRental | null>(null);
  const { isModalOpen, openModal, closeModal } = useModal();
  const handlePayClick = useCallback(
    (rental: TRental) => {
      setSelectedRental(rental);
      openModal();
    },
    [openModal]
  );
  return (
    <div className="space-y-4">
      {rentals.length === 0 ? (
        <div style={{ maxWidth: 600 }} className="mx-auto">
          <Text variant="H3" className="mb-4 text-center">
            No Rentals Available
          </Text>
          {renderRentalEmptyMessage(showPayButton)}
        </div>
      ) : (
        <RentalCards
          rentals={rentals}
          showPayButton={showPayButton}
          onPayClick={handlePayClick}
        />
      )}
      {selectedRental && (
        <PayModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          rental={selectedRental}
        />
      )}
    </div>
  );
};
