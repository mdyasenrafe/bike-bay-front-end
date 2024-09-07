import React, { useState, useMemo } from "react";
import { Divider, Input } from "antd";
import { toast } from "sonner";
import { TRental } from "../../../../../../../../redux/features/rental";
import { Button, Text } from "../../../../../../../../components/atoms";
import { Modal } from "../../../../../../../../components";

type PayModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
  rental: TRental;
};

export const applyCoupon = (couponCode: string) => {
  if (couponCode === "SAVE10") {
    return { success: true, discount: 10 };
  }
  return { success: false, discount: 0 };
};

export const PayModal: React.FC<PayModalProps> = ({
  isModalOpen,
  closeModal,
  rental,
}) => {
  const [couponCode, setCouponCode] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);

  const totalAfterDiscount = useMemo(
    () => Math.max(0, rental.totalCost - discount),
    [rental.totalCost, discount]
  );

  const handleApplyCoupon = () => {
    const result = applyCoupon(couponCode);
    setDiscount(result.discount);
    if (result.success) {
      toast.success("Coupon applied successfully!");
    } else {
      toast.error("Invalid coupon code.");
    }
  };

  const handlePayment = () => {
    toast.success("Payment completed successfully!");
    closeModal();
  };

  return (
    <Modal
      title="Complete Your Payment"
      isModalOpen={isModalOpen}
      closeModal={closeModal}
    >
      <div className="flex flex-col space-y-6">
        {/* Total Section */}
        <div className="p-4 border border-gray-300 rounded-lg shadow-sm bg-white flex justify-between">
          <Text variant="H4" className="mb-2 text-gray-800">
            Total Amount
          </Text>
          <Text variant="H5" className="font-semibold text-gray-600">
            ${rental.totalCost.toFixed(2)}
          </Text>
        </div>

        {/* Coupon Input Section */}
        <div className="flex items-center justify-between space-x-4">
          <Input
            placeholder="Enter Coupon Code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-lg"
            allowClear
          />
          <Button
            color="secondary"
            className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
            onClick={handleApplyCoupon}
          >
            Apply
          </Button>
        </div>

        {/* Divider */}
        <Divider />

        {/* Discount and Final Total */}
        <div className="p-4 border border-gray-300 rounded-lg shadow-sm bg-white">
          <Text variant="P2" className="mb-2 text-gray-800">
            Discount Applied: <span className="font-semibold">${discount}</span>
          </Text>
          <Text variant="H5" className="font-semibold text-gray-600">
            Final Total: ${totalAfterDiscount.toFixed(2)}
          </Text>
        </div>

        {/* Pay Button */}
        <Button
          color="primary"
          className="w-full py-3 text-white bg-green-600 rounded-lg hover:bg-green-700"
          onClick={handlePayment}
        >
          Pay ${totalAfterDiscount.toFixed(2)}
        </Button>
      </div>
    </Modal>
  );
};
