import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

export const formatStartTime = (startTime: string) => {
  const localStartTime = dayjs(startTime).local();
  const now = dayjs();

  if (now.isBefore(localStartTime)) {
    return `Starts at ${localStartTime.format("h:mm A, MMM D")}`;
  } else {
    return localStartTime.format("h:mm A, MMM D");
  }
};

export const getTimeRemaining = (endTime: string) => {
  const now = dayjs();
  const end = dayjs(endTime);

  if (end.isBefore(now)) return "Due";

  return end.fromNow(true);
};

export const getTimeAgo = (startTime: string) => {
  const now = dayjs();
  const start = dayjs(startTime);

  if (start.isAfter(now)) {
    return "In the future";
  }

  const diffInMinutes = now.diff(start, "minute");
  const days = Math.floor(diffInMinutes / 1440);
  const hours = Math.floor((diffInMinutes % 1440) / 60);
  const minutes = diffInMinutes % 60;

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ${hours} hour${
      hours > 1 ? "s" : ""
    } ${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ${minutes} minute${
      minutes > 1 ? "s" : ""
    } ago`;
  } else {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  }
};

export const getDuration = (startTime: string, endTime: string) => {
  const start = dayjs(startTime);
  const end = dayjs(endTime);
  const diff = end.diff(start);

  const durationObj = dayjs.duration(diff);
  const days = Math.floor(durationObj.asDays());
  const hours = durationObj.hours();
  const minutes = durationObj.minutes();

  let durationStr = "";
  if (days > 0) {
    durationStr += `${days} day${days > 1 ? "s" : ""} `;
  }
  if (hours > 0) {
    durationStr += `${hours} hour${hours > 1 ? "s" : ""} `;
  }
  if (minutes > 0) {
    durationStr += `${minutes} minute${minutes > 1 ? "s" : ""}`;
  }
  return durationStr.trim() || "Less than a minute";
};
