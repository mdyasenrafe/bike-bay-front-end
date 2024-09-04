import { z } from "zod";

export const bookingSchema = z.object({
  startDate: z.any(),
  startTime: z.any(),
});
