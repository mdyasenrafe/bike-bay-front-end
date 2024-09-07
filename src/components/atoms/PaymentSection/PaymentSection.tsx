import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PaymentForm } from "../PaymentForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY!);

type PaymentSectionProps = {
  clientSecret: string;
};

export const PaymentSection: React.FC<PaymentSectionProps> = ({
  clientSecret,
}) => {
  const stripeOptions = {
    clientSecret,
  };

  return (
    <Elements stripe={stripePromise} options={stripeOptions}>
      <PaymentForm />
    </Elements>
  );
};
