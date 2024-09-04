import React, { useState, useMemo } from "react";
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

const PaymentForm = ({ clientSecret }: { clientSecret: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      toast.error("Stripe.js has not loaded yet. Please try again.");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "http://localhost:3000/success", // Replace with your success URL
        },
      });

      console.log(error);

      if (error) {
        toast.error("Payment failed. Please try again.");
      } else {
        toast.success("Payment successful! Your booking is confirmed.");
      }
    } catch (err: any) {
      console.log(err);
      toast.error("An error occurred during the payment process.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form id="payment-form" onSubmit={handlePayment}>
      <PaymentElement id="payment-element" />
      <Button
        color="primary"
        htmlType="submit"
        className="w-full h-[48px] text-[18px] text-white"
        disabled={isLoading}
        loading={isLoading}
      >
        {isLoading ? "Processing..." : "Pay"}
      </Button>
    </form>
  );
};

export const BookingModal: React.FC<BookingModalProps> = ({
  isModalOpen,
  closeModal,
  productData,
}) => {
  const bookingTitle = `Book Your Ride with ${productData.name}`;

  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const [createRental, { isLoading }] = useCreateRentalMutation();

  const createPaymentIntent = async (data: TBookingValues) => {
    try {
      const combinedDateTime = moment(data.startDate)
        .set({
          hour: moment(data.startTime).get("hour"),
          minute: moment(data.startTime).get("minute"),
        })
        .utc()
        .toISOString();

      const rentalData: TRentalRequest = {
        bikeId: productData?._id as string,
        startTime: combinedDateTime,
      };
      const res = await createRental(rentalData).unwrap();
      setClientSecret(res.clientSecret);
      return res.clientSecret;
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to create rental or payment intent.");
      return null;
    }
  };

  const onSubmit: SubmitHandler<TBookingValues> = async (data) => {
    await createPaymentIntent(data);
  };

  // Memoizing options for Elements to prevent unnecessary re-renders
  const stripeOptions = useMemo(
    () => ({
      clientSecret: clientSecret ?? "", // Ensure it's always a string
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
          >
            Submit
          </Button>
        </FormWrapper>
      ) : (
        clientSecret && (
          <Elements stripe={stripePromise} options={stripeOptions}>
            <PaymentForm clientSecret={clientSecret} />
          </Elements>
        )
      )}
    </Modal>
  );
};
