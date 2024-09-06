import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, { message: "Bike name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  pricePerHour: z
    .number()
    .positive({ message: "Price per hour must be a positive number" }),
  cc: z.number().positive({ message: "CC must be a positive number" }),
  model: z.string().min(1, { message: "Model is required" }),
  brand: z.string().min(1, { message: "Brand is required" }),
  thumb: z.string(),
  year: z.number().min(1900, { message: "Year must be a valid number" }),
});
