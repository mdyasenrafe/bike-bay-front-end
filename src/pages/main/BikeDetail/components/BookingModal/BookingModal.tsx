import React, { useState } from "react";
import { Modal } from "../../../../../components";
import { SubmitHandler } from "react-hook-form";
import {
  FormDatePicker,
  FormTimePicker,
  FormWrapper,
} from "../../../../../components/form";
import { Button, Text } from "../../../../../components/atoms";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { TProduct } from "../../../../../redux/features/product";
import {
  TRentalRequest,
  useCreateRentalMutation,
} from "../../../../../redux/features/rental";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema } from "../../../../../Schema";

type BookingModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
  productData: TProduct;
};

export type TBookingValues = {
  startDate: string;
  startTime: string;
};

export const BookingModal: React.FC<BookingModalProps> = ({
  isModalOpen,
  closeModal,
  productData,
}) => {
  const bookingTitle = `Book Your Ride with ${productData.name}`;
  // states
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  // hooks
  const [createRental] = useCreateRentalMutation();
  const stripe = useStripe();
  const elements = useElements();

  // on submit function
  const onSubmit: SubmitHandler<TBookingValues> = async (data) => {
    try {
      if (productData?.isAvailable) {
        const startDateTime = new Date(`${data.startTime}T${data.startDate}`);
        const rentalData: TRentalRequest = {
          bikeId: productData?._id as string,
          startTime: startDateTime,
        };
        const res = await createRental(rentalData).unwrap();
        setClientSecret(res.clientSecret);
        const { error } = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: "http://localhost:3000/success",
          },
        });
        if (error) {
          toast.error("Payment failed. Please try again.");
        } else {
          toast.success("Payment successful! Your booking is confirmed.");
        }
      } else {
        toast.warning("The selected bike is currently unavailable.");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <Modal
      title={bookingTitle}
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      centered
      width={650}
    >
      <FormWrapper onSubmit={onSubmit} resolver={zodResolver(bookingSchema)}>
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
      {clientSecret && <PaymentElement />}
    </Modal>
  );
};
