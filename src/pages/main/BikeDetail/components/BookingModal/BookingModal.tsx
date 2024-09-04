import React, { useState } from "react";
import { Modal } from "../../../../../components";
import { FieldValues, SubmitHandler } from "react-hook-form";
import {
  FormDatePicker,
  FormTimePicker,
  FormWrapper,
} from "../../../../../components/form";
import { Button, Text } from "../../../../../components/atoms";
import { loadStripe } from "@stripe/stripe-js";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { TProduct } from "../../../../../redux/features/product";

type BookingModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
  productData: TProduct;
};

export const BookingModal: React.FC<BookingModalProps> = ({
  isModalOpen,
  closeModal,
  productData,
}) => {
  const bookingTitle = `Book Your Ride with ${productData.name}`;
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {};

  return (
    <Modal
      title={bookingTitle}
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      centered
      width={650}
      style={{
        marginTop: "20px",
      }}
    >
      <FormWrapper onSubmit={onSubmit}>
        <FormDatePicker name="startDate" label="Start Date" />
        <FormTimePicker name="startTime" label="Start Time" />

        <Text variant="P4" className="mb-4 text-orange-600">
          *Please note that a non-refundable advance payment of $1 is required
          to confirm your booking.
        </Text>

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
