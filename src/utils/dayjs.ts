import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const timeJs = (time: string) => {
  if (!dayjs(time).isValid()) return "유효하지 않은 시간입니다.";
  return dayjs(time).locale("ko").format("A hh:mm");
};

export const pastAwayJs = (time: string) => {
  const today = new Date();
  const theDay = dayjs(time);
  let diffFromToday = dayjs(today).diff(theDay, "d", true);
  if (diffFromToday < 1 && today.getDate() === theDay.date()) return "오늘";
  if (diffFromToday <= 1 && today.getDate() !== theDay.date()) return "어제";
  return theDay.locale("ko").fromNow();
};

export const recordUrlJs = (recordAt: string) => {
  return dayjs(recordAt).format("YYYY-MM-DD-HH");
};
