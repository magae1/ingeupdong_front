import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);

export const timeJs = (time: string) => {
  if (!dayjs(time, ["hh:mm", "hh:mm:ss"]).isValid())
    return "유효하지 않은 시간입니다.";
  return dayjs(time, ["hh:mm", "hh:mm:ss"]).locale("ko").format("A hh:mm");
};

export const pastAwayJs = (time: string) => {
  return dayjs(time).locale("ko").fromNow();
};
