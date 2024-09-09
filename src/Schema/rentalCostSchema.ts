import dayjs from "dayjs";
import { z } from "zod";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

// Extend Day.js with the plugins
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

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

      endTime: z.preprocess(
        (arg) => {
          if (typeof arg === "string" || arg instanceof Date) {
            return new Date(arg);
          } else if (arg && dayjs.isDayjs(arg)) {
            return arg.toDate();
          }
          return undefined;
        },
        z.date().refine(
          (time) => {
            // Ensure endTime is not in the future
            return dayjs(time).isSameOrBefore(dayjs(), "minute");
          },
          { message: "End time must be in the past or the current time" }
        )
      ),
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
