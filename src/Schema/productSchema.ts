import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, { message: "Bike name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  pricePerHour: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Price per hour must be a positive number",
    }),
  cc: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "CC must be a positive number",
    }),
  model: z.string().min(1, { message: "Model is required" }),
  brand: z.string().min(1, { message: "Brand is required" }),
  thumb: z.string(),
  year: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val) && val >= 1900, {
      message: "Year must be a valid number",
    }),
});
