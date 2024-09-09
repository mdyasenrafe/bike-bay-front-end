export type TCoupon = {
  _id: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  isActive: boolean;
};

export type TValidateCoupon = {
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
};
