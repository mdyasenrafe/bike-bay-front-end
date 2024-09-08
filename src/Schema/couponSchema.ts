import { z } from "zod";

export const createCouponSchema = z.object({
  code: z.string().min(1, "Coupon Code is required"),
  discountType: z.enum(["percentage", "fixed"], {
    errorMap: () => ({ message: "Invalid discount type" }),
  }),
  discountValue: z
    .string()
    .min(1, "Discount Value is required")
    .regex(/^\d+(\.\d+)?$/, "Discount Value must be a valid number")
    .transform((val) => parseFloat(val)) // Convert string to number
    .refine((val) => val >= 0, "Discount Value must be a non-negative number"),
});
