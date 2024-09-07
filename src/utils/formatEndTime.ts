import dayjs from "dayjs";

export const formatEndTime = (endTime: string) => {
  const locaEndTime = dayjs(endTime).local();
  const now = dayjs();

  if (now.isBefore(locaEndTime)) {
    return `Not returned`;
  } else {
    return locaEndTime.format("h:mm A, MMM D");
  }
};
