import dayjs from "dayjs";
import { z } from "zod";

export const bookingSchema = z
  .object({
    startDate: z.preprocess((arg) => {
      // Convert Dayjs or string to a Date object
      if (typeof arg === "string" || arg instanceof Date) {
        return new Date(arg);
      } else if (arg && dayjs.isDayjs(arg)) {
        return arg.toDate(); // Convert Dayjs to Date
      }
      return undefined;
    }, z.date().min(dayjs().startOf("day").toDate(), { message: "Start date must be today or in the future" })),

    startTime: z.preprocess((arg) => {
      // Convert Dayjs or string to a Date object
      if (typeof arg === "string" || arg instanceof Date) {
        return new Date(arg);
      } else if (arg && dayjs.isDayjs(arg)) {
        return arg.toDate(); // Convert Dayjs to Date
      }
      return undefined;
    }, z.date()),
  })
  .refine(
    (data) => {
      // Validate startTime based on the selected startDate
      const startDate = dayjs(data.startDate);
      const startTime = dayjs(data.startTime);

      if (startDate.isSame(dayjs(), "day")) {
        // If startDate is today, startTime must be in the future
        return startTime.isAfter(dayjs());
      }
      // If startDate is in the future, startTime is valid anytime
      return true;
    },
    {
      message: "Start time must be in the future if the start date is today.",
      path: ["startTime"], // Specify the path for the error message
    }
  );
