import React, { useState } from "react";
import { Input } from "antd";
import { Button, Text } from "../../../../../../../../../../components/atoms";

type CouponInputProps = {
  onApplyCoupon: (couponCode: string) => void;
  isCouponLoading: boolean;
};

export const CouponInput: React.FC<CouponInputProps> = ({
  onApplyCoupon,
  isCouponLoading,
}) => {
  const [couponCode, setCouponCode] = useState<string>("");

  const handleApplyCoupon = () => {
    onApplyCoupon(couponCode);
  };

  return (
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
          loading={isCouponLoading}
          disabled={isCouponLoading}
        >
          Apply
        </Button>
      </div>
    </div>
  );
};
