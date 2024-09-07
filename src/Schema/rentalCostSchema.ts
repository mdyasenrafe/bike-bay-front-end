import dayjs from "dayjs";
import { z } from "zod";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

// Extend Day.js with the plugin
dayjs.extend(isSameOrAfter);

export const rentalCostSchema = (startTime: string) =>
  z
    .object({
      endDate: z.preprocess(
        (arg) => {
          if (typeof arg === "string" || arg instanceof Date) {
            return new Date(arg);
          } else if (arg && dayjs.isDayjs(arg)) {
            return arg.toDate();
          }
          return undefined;
        },
        z.date().refine(
          (date) => {
            // Compare only the date, ignore the time
            return dayjs(date).isSameOrAfter(dayjs(startTime), "day");
          },
          { message: "End date must be on or after the start date" }
        )
      ),

      endTime: z.preprocess((arg) => {
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
        const startDateTime = dayjs(startTime);
        const endDateTime = dayjs(data.endDate)
          .hour(dayjs(data.endTime).hour())
          .minute(dayjs(data.endTime).minute());

        // Validate that endDateTime is after startDateTime
        return (
          endDateTime.isAfter(startDateTime) ||
          endDateTime.isSame(startDateTime, "minute")
        );
      },
      {
        message: "End time must be after the start time",
        path: ["endTime"],
      }
    );
