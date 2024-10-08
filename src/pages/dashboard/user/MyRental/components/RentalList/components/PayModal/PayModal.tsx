import React, { useState, useCallback, useEffect } from "react";
import { Divider } from "antd";
import { toast } from "sonner";
import {
  TRental,
  useCompleteRentalCostMutation,
} from "../../../../../../../../redux/features/rental";
import { useValidateCouponMutation } from "../../../../../../../../redux/features/coupon";
import { Modal } from "../../../../../../../../components";
import {
  Button,
  PaymentSection,
} from "../../../../../../../../components/atoms";
import { PaymentSummary, TotalAmountDisplay } from "./components";
import { CouponInput } from "./components/CouponInput";

type PayModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
  rental: TRental;
};

export const PayModal: React.FC<PayModalProps> = ({
  isModalOpen,
  closeModal,
  rental,
}) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [discount, setDiscount] = useState<number>(0);
  const [totalText, setTotalText] = useState<number>(rental?.totalCost);
  const [completeRental, { isLoading }] = useCompleteRentalCostMutation();
  const [validateCoupon, { isLoading: isCouponLoading }] =
    useValidateCouponMutation();
  const [couponCode, setCouponCode] = useState<string>("");

  const advancePaymentAmount = 100;

  // Function to validate and apply the coupon
  const handleApplyCoupon = useCallback(async () => {
    try {
      const response = await validateCoupon({
        couponCode,
        totalAmount: rental.totalCost,
      }).unwrap();

      if (response?.data.discount > 0) {
        setDiscount(response?.data?.discount);
        setTotalText(response?.data?.finalAmount);
        toast.success("Coupon applied successfully!");
      } else {
        toast.error("Coupon did not apply any discount.");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Invalid coupon code.");
    }
  }, [rental.totalCost, validateCoupon, couponCode]);

  // Automatically set the coupon code from localStorage when the modal opens
  useEffect(() => {
    const savedCoupon = localStorage.getItem("savedCoupon");
    if (savedCoupon) {
      setCouponCode(savedCoupon);
    }
  }, [isModalOpen]);

  // Automatically apply coupon when the modal opens if there's a coupon code
  useEffect(() => {
    const savedCoupon = localStorage.getItem("savedCoupon");
    if (couponCode && savedCoupon) {
      handleApplyCoupon();
    }
  }, [couponCode, handleApplyCoupon]);

  // Function to handle payment
  const handlePayment = useCallback(async () => {
    try {
      const res = await completeRental({
        id: rental?._id,
        couponCode,
      }).unwrap();
      setClientSecret(res.clientSecret);
    } catch (err: any) {
      toast.error(
        err?.data?.message || "Failed to create rental or payment intent."
      );
    }
  }, [completeRental, rental._id, couponCode]);

  return (
    <Modal
      title="Complete Your Payment"
      isModalOpen={isModalOpen}
      closeModal={closeModal}
    >
      {clientSecret ? (
        <PaymentSection clientSecret={clientSecret} />
      ) : (
        <div className="space-y-6">
          <TotalAmountDisplay totalCost={rental.totalCost} />

          <CouponInput
            onApplyCoupon={handleApplyCoupon}
            isCouponLoading={isCouponLoading}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
          />

          <Divider />

          <PaymentSummary
            totalCost={rental.totalCost}
            advancePaymentAmount={advancePaymentAmount}
            discount={discount}
            totalAfterDiscount={totalText}
          />

          <Button
            color="primary"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={handlePayment}
            loading={isLoading}
            disabled={isLoading}
          >
            Pay ৳{totalText}
          </Button>
        </div>
      )}
    </Modal>
  );
};
