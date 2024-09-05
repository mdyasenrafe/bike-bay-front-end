import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { Button } from "../Button";

export const PaymentForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!stripe || !elements) {
        toast.error("Stripe.js has not loaded yet. Please try again.");
        return;
      }

      setIsLoading(true);

      try {
        const { error } = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: "http://localhost:3000/payment-success",
          },
        });

        if (error) {
          toast.error("Payment failed. Please try again.");
        } else {
          toast.success("Payment successful! Your booking is confirmed.");
        }
      } catch (err) {
        console.error("Payment Error:", err);
        toast.error("An error occurred during the payment process.");
      } finally {
        setIsLoading(false);
      }
    },
    [stripe, elements]
  );

  return (
    <form id="payment-form" onSubmit={handlePayment}>
      <PaymentElement id="payment-element" />
      <Button
        color="primary"
        htmlType="submit"
        className="w-full h-[48px] text-[18px] text-white mt-5"
        disabled={isLoading}
        loading={isLoading}
      >
        {isLoading ? "Processing..." : "Pay"}
      </Button>
    </form>
  );
};
