import React from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "../../../components/layouts";
import { Button, Container, Text } from "../../../components/atoms";

export const PaymentSuccess = () => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate("/");
  };

  return (
    <MainLayout>
      <Container>
        <section className="flex flex-col items-center justify-center h-screen">
          <div className="text-center">
            <img
              src="https://i.ibb.co/f0XtJ8s/succesfull.png"
              alt="Booking Successful"
              className="mx-auto mb-4"
            />
            <Text variant={"H1"} className="mb-2">
              Thank you for booking with BikeBay!
            </Text>
            <Text variant={"P2"} className="mb-6">
              Your booking has been confirmed successfully. You will receive a
              confirmation email shortly with the details of your booking and
              instructions for your ride.
            </Text>
            <div className="flex justify-center">
              <Button
                onClick={handleContinueShopping}
                color="primary"
                className="text-white h-[48px] w-[200px] rounded-full font-poppins text-[16px]"
              >
                Explore More Bikes
              </Button>
            </div>
          </div>
        </section>
      </Container>
    </MainLayout>
  );
};
