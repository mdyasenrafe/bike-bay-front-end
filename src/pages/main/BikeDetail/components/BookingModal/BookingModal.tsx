import React, { useState, useMemo, useCallback } from "react";
import { Modal } from "../../../../../components";
import { SubmitHandler } from "react-hook-form";
import {
  FormDatePicker,
  FormTimePicker,
  FormWrapper,
} from "../../../../../components/form";
import { Button, PaymentForm, Text } from "../../../../../components/atoms";
import {
  useStripe,
  useElements,
  PaymentElement,
  Elements,
} from "@stripe/react-stripe-js"; // Import Elements and types
import { TProduct } from "../../../../../redux/features/product";
import {
  TRentalRequest,
  useCreateRentalMutation,
} from "../../../../../redux/features/rental";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema } from "../../../../../Schema";
import moment from "moment";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY!);

// Define types for the form data
export type TBookingValues = {
  startDate: Date;
  startTime: Date;
};

export type BookingModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
  productData: TProduct;
};

export const BookingModal: React.FC<BookingModalProps> = ({
  isModalOpen,
  closeModal,
  productData,
}) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [createRental, { isLoading }] = useCreateRentalMutation();

  const bookingTitle = `Book Your Ride with ${productData.name}`;

  const createPaymentIntent = useCallback(
    async (data: TBookingValues) => {
      try {
        const combinedDateTime = moment(data.startDate)
          .set({
            hour: moment(data.startTime).get("hour"),
            minute: moment(data.startTime).get("minute"),
          })
          .utc()
          .toISOString();

        const rentalData: TRentalRequest = {
          bikeId: productData._id as string,
          startTime: combinedDateTime,
        };
        const res = await createRental(rentalData).unwrap();
        setClientSecret(res.clientSecret);
        return res.clientSecret;
      } catch (err) {
        console.error("Create Payment Intent Error:", err);
        toast.error("Failed to create rental or payment intent.");
        return null;
      }
    },
    [createRental, productData._id]
  );

  const onSubmit: SubmitHandler<TBookingValues> = useCallback(
    async (data) => {
      if (productData?.isAvailable) {
        await createPaymentIntent(data);
      } else {
        toast.error("This bike is not available at the moment");
      }
    },
    [createPaymentIntent]
  );

  const stripeOptions = useMemo(
    () => ({
      clientSecret: clientSecret || "", // Ensure it's always a string
    }),
    [clientSecret]
  );

  return (
    <Modal
      title={bookingTitle}
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      centered
      width={650}
    >
      {!clientSecret ? (
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
            loading={isLoading}
          >
            Submit
          </Button>
        </FormWrapper>
      ) : (
        <Elements stripe={stripePromise} options={stripeOptions}>
          <PaymentForm />
        </Elements>
      )}
    </Modal>
  );
};
