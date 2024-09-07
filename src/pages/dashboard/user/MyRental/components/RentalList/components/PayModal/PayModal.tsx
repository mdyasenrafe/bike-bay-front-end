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
      <div className="space-y-6">
        {/* Total Section */}
        <div className="p-4 border rounded-lg shadow-sm bg-gray-100 flex justify-between items-center">
          <Text variant="H4" className="text-gray-800">
            Total Amount
          </Text>
          <Text variant="H5" className="font-semibold text-gray-800">
            ${rental.totalCost.toFixed(2)}
          </Text>
        </div>

        {/* Coupon Input Section */}
        <div className="flex flex-col space-y-2">
          <Text variant="P2" className="text-gray-500">
            Have a coupon code? Apply it below.
          </Text>
          <div className="flex items-center space-x-4">
            <Input
              placeholder="Enter Coupon Code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="p-3 border border-gray-300 rounded-md shadow-sm flex-1"
            />
            <Button
              color="secondary"
              className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              onClick={handleApplyCoupon}
            >
              Apply
            </Button>
          </div>
        </div>

        {/* Divider */}
        <Divider />

        {/* Discount and Final Total */}
        <div className="p-4 border rounded-lg shadow-sm bg-gray-100">
          <div className="flex justify-between items-center">
            <Text variant="P2" className="text-gray-800">
              Discount Applied:
            </Text>
            <Text variant="P2" className="font-semibold text-green-600">
              - ${discount.toFixed(2)}
            </Text>
          </div>
          <div className="flex justify-between items-center mt-2">
            <Text variant="H5" className="font-semibold text-gray-800">
              Final Total:
            </Text>
            <Text variant="H5" className="font-semibold text-gray-800">
              ${totalAfterDiscount.toFixed(2)}
            </Text>
          </div>
        </div>

        {/* Pay Button */}
        <Button
          color="primary"
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={handlePayment}
        >
          Pay ${totalAfterDiscount.toFixed(2)}
        </Button>
      </div>
    </Modal>
  );
};
