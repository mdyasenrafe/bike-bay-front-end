import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, { message: "Bike name is required" }),
  description: z.string().min(1, { message: "Description is required" }),

  pricePerHour: z
    .union([z.string(), z.number()])
    .transform((val) => {
      if (typeof val === "string") {
        return parseFloat(val);
      }
      return val;
    })
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Price per hour must be a positive number",
    }),

  cc: z
    .union([z.string(), z.number()])
    .transform((val) => {
      if (typeof val === "string") {
        return parseFloat(val);
      }
      return val;
    })
    .refine((val) => !isNaN(val) && val > 0, {
      message: "CC must be a positive number",
    }),

  model: z.string().min(1, { message: "Model is required" }),
  brand: z.string().min(1, { message: "Brand is required" }),
  thumb: z.string(),

  year: z
    .union([z.string(), z.number()])
    .transform((val) => {
      if (typeof val === "string") {
        return parseInt(val, 10);
      }
      return val;
    })
    .refine((val) => !isNaN(val) && val >= 1900, {
      message: "Year must be a valid number",
    }),
});
