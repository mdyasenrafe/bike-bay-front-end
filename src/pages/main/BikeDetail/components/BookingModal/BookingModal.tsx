import React from "react";
import { Modal } from "../../../../../components";

type BookingModalProps = {
  isModalOpen: true;
  closeModal: () => void;
};

export const BookingModal: React.FC<BookingModalProps> = ({
  isModalOpen,
  closeModal,
}) => {
  return (
    <Modal
      title="Booking Modal"
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      centered
    >
      <p>THis is modal</p>
    </Modal>
  );
};
