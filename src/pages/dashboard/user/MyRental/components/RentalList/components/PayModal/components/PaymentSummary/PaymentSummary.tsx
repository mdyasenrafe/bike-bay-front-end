import React from "react";
import { Divider } from "antd";
import { Text } from "../../../../../../../../../../components/atoms";

type PaymentSummaryProps = {
  totalCost: number;
  advancePaymentAmount: number;
  discount: number;
  totalAfterDiscount: number;
};

export const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  totalCost,
  advancePaymentAmount,
  discount,
  totalAfterDiscount,
}) => {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-gray-100">
      <div className="flex justify-between items-center">
        <Text variant="P2" className="text-gray-800">
          Original Total Cost:
        </Text>
        <Text variant="P2" className="font-semibold text-gray-800">
          ${totalCost}
        </Text>
      </div>

      <div className="flex justify-between items-center">
        <Text variant="P2" className="text-gray-800">
          Advance Payment Deducted:
        </Text>
        <Text variant="P2" className="font-semibold text-green-600">
          - ${advancePaymentAmount}
        </Text>
      </div>

      <div className="flex justify-between items-center">
        <Text variant="P2" className="text-gray-800">
          Discount Applied:
        </Text>
        <Text variant="P2" className="font-semibold text-green-600">
          - ${discount}
        </Text>
      </div>

      <Divider />

      <div className="flex justify-between items-center mt-2">
        <Text variant="H5" className="font-semibold text-gray-800">
          Final Total:
        </Text>
        <Text variant="H5" className="font-semibold text-gray-800">
          ${totalAfterDiscount}
        </Text>
      </div>
    </div>
  );
};
