import dayjs from "dayjs";
import { z } from "zod";

export const bookingSchema = z
  .object({
    startDate: z.preprocess((arg) => {
      if (typeof arg === "string" || arg instanceof Date) {
        return new Date(arg);
      } else if (arg && dayjs.isDayjs(arg)) {
        return arg.toDate();
      }
      return undefined;
    }, z.date().min(dayjs().startOf("day").toDate(), { message: "Start date must be today or in the future" })),

    startTime: z.preprocess((arg) => {
      if (typeof arg === "string" || arg instanceof Date) {
        return new Date(arg);
      } else if (arg && dayjs.isDayjs(arg)) {
        return arg.toDate();
      }
      return undefined;
    }, z.date()),
  })
  .refine(
    (data) => {
      const startDate = dayjs(data.startDate);
      const startTime = dayjs(data.startTime);

      if (startDate.isSame(dayjs(), "day")) {
        return startTime.isAfter(dayjs());
      }
      return true;
    },
    {
      message: "Start time must be in the future if the start date is today.",
      path: ["startTime"],
    }
  );
