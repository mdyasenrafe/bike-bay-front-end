import dayjs from "dayjs";

export const formatStartTime = (startTime: string) => {
  const localStartTime = dayjs(startTime).local();
  const now = dayjs();

  if (now.isBefore(localStartTime)) {
    return `Starts at ${localStartTime.format("h:mm A, MMM D")}`;
  } else {
    return localStartTime.format("h:mm A, MMM D");
  }
};
