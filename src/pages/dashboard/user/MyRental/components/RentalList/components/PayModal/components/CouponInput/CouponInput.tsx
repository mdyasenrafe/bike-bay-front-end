import React, { useState } from "react";
import { Input } from "antd";
import { Button, Text } from "../../../../../../../../../../components/atoms";

type CouponInputProps = {
  onApplyCoupon: () => void;
  isCouponLoading: boolean;
  couponCode: string;
  setCouponCode: React.Dispatch<React.SetStateAction<string>>;
};

export const CouponInput: React.FC<CouponInputProps> = ({
  onApplyCoupon,
  isCouponLoading,
  couponCode,
  setCouponCode,
}) => {
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
          onClick={onApplyCoupon}
          loading={isCouponLoading}
          disabled={isCouponLoading}
        >
          Apply
        </Button>
      </div>
    </div>
  );
};
