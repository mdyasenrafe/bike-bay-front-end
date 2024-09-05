import dayjs from "dayjs";
import { z } from "zod";

export const bookingSchema = z.object({
  startDate: z.preprocess((arg) => {
    return typeof arg === "string" || arg instanceof Date
      ? new Date(arg)
      : undefined;
  }, z.date().min(dayjs().startOf("day").toDate(), { message: "Start date must be today or in the future" })),

  startTime: z.preprocess(
    (arg) => {
      return typeof arg === "string" || arg instanceof Date
        ? new Date(arg)
        : undefined;
    },
    z.date().refine(
      (val) => {
        const now = dayjs();
        const selectedTime = dayjs(val);

        return selectedTime.isAfter(now);
      },
      { message: "Start time must be in the future" }
    )
  ),
});
