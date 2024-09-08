export type TCoupon = {
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  isActive: boolean;
};

export type TValidateCouponResponse = {
  discount: number;
  finalAmount: number;
};

export type TValidateCouponRequest = {
  couponCode: string;
  totalAmount: number;
};

export type TCouponRequest = {
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  isActive?: boolean;
};
