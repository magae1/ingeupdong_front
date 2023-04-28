import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const timeJs = (time: string) => {
  if (!dayjs(time).isValid()) return "유효하지 않은 시간입니다.";
  return dayjs(time).locale("ko").format("A hh:mm");
};

export const pastAwayJs = (time: string) => {
  return dayjs(time).locale("ko").fromNow();
};
