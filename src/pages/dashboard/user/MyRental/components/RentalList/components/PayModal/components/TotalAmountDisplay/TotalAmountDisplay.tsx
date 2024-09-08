import React from "react";
import { Text } from "../../../../../../../../../../components/atoms";

type TotalAmountDisplayProps = {
  totalCost: number;
};

export const TotalAmountDisplay: React.FC<TotalAmountDisplayProps> = ({
  totalCost,
}) => {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-gray-100 flex justify-between items-center">
      <Text variant="H4" className="text-gray-800">
        Total Amount
      </Text>
      <Text variant="H5" className="font-semibold text-gray-800">
        ${totalCost.toFixed(2)}
      </Text>
    </div>
  );
};
