import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DateCalendar,
  DayCalendarSkeleton,
  LocalizationProvider,
  PickersDay,
  PickersDayProps,
} from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import _ from "underscore";

import { IRecording } from "../utils/interfaces";
import { mainFetcher } from "../utils/fetchers";
import { CalendarModalControl } from "./CalendarModal";

interface Props {
  initDate: Dayjs;
}

const RecordedDay = (
  props: PickersDayProps<Dayjs> & { data?: IRecording[] }
) => {
  const navigate = useNavigate();
  const { data = [], day, outsideCurrentMonth, ...other } = props;
  const dayForm = day.format("YYYY-MM-DD");
  const dataIndex = _.findIndex(
    data,
    (dt) => dayjs(dt.record_at).format("YYYY-MM-DD") === dayForm
  );
  const isEnabled = !props.outsideCurrentMonth && dataIndex >= 0;
  return (
    <PickersDay
      {...other}
      outsideCurrentMonth={outsideCurrentMonth}
      day={day}
      disabled={!isEnabled}
      onClick={() =>
        navigate(`/${dayjs(data[dataIndex].record_at).format("YYYY-MM-DD")}`)
      }
    />
  );
};

const RecordCalendar = ({ initDate }: Props) => {
  const [curDay, setCurDay] = useState(initDate);
  const modalControl = React.useContext(CalendarModalControl);

  const { data, isLoading, isValidating } = useSWR<IRecording[]>(
    `/recording/?month=${curDay.month() + 1}&year=${curDay.year()}`,
    mainFetcher,
    {
      revalidateIfStale: false,
    }
  );

  const handleMonthChange = (date: Dayjs) => {
    setCurDay(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"ko"}>
      <DateCalendar
        value={initDate}
        onChange={(newValue) => {
          if (!newValue) return null;
          modalControl.closeModal();
          setCurDay(newValue);
        }}
        loading={isLoading || isValidating}
        onMonthChange={handleMonthChange}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
          day: RecordedDay,
        }}
        views={["day"]}
        slotProps={{
          day: {
            data,
          } as any,
        }}
      />
    </LocalizationProvider>
  );
};

export default RecordCalendar;
