import { z } from "zod";

export const bookingSchema = z.object({
  startDate: z.string().min(1, "Start Date is required"),
  startTime: z.string().min(1, "Start Time is required"),
});
