import React from "react";
import { Modal } from "../../../../../components";
import { FieldValues, SubmitHandler } from "react-hook-form";
import {
  FormDatePicker,
  FormTimePicker,
  FormWrapper,
} from "../../../../../components/form";
import { Button } from "../../../../../components/atoms";

type BookingModalProps = {
  isModalOpen: true;
  closeModal: () => void;
  title: string;
};

export const BookingModal: React.FC<BookingModalProps> = ({
  isModalOpen,
  closeModal,
  title,
}) => {
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {};
  return (
    <Modal
      title={title}
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      centered
    >
      <FormWrapper onSubmit={onSubmit}>
        <FormDatePicker name="startDate" label="Start Date" />
        <FormTimePicker name="startTime" label="Start Time" />
        <Button
          color="primary"
          htmlType="submit"
          className="w-full h-[48px] text-[18px] text-white"
        >
          Pay
        </Button>
      </FormWrapper>
    </Modal>
  );
};
