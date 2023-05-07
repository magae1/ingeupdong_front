import React, { useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import { useTheme } from "@mui/material";
import dayjs from "dayjs";
import _ from "underscore";
import weekOfYear from "dayjs/plugin/weekOfYear";

import { ICalendar } from "../utils/interfaces";
import { deepOrange, grey, red } from "@mui/material/colors";

dayjs.extend(weekOfYear);
const paddingDates = (startDate: string, endDate: string) => {
  const s = dayjs(startDate);
  const e = dayjs(endDate);
  const firstDate = s.subtract(s.day(), "d");
  const lastDate = e.add(6 - e.day(), "d");
  return { firstDate, lastDate };
};

const ChannelRecordCalendar = (props: {
  records: ICalendar[];
  startDate: string;
  endDate: string;
  height: number;
}) => {
  const theme = useTheme();
  const { records, startDate, endDate, height } = props;

  const data: (number | null)[][] = useMemo(() => {
    const { firstDate, lastDate } = paddingDates(startDate, endDate);
    const table: { [key: string]: number } = {};
    records.forEach((value) => {
      table[value.day] = value.value;
    });

    const result: (number | null)[][] = [[]];
    for (let k = 0; k < 6; k++) result.push([]);
    let index = 0;
    let currentDate = firstDate.clone();
    while (true) {
      let i = index % 7;
      let curDay = currentDate.format("YYYY-MM-DD");
      if (curDay in table) {
        result[i].push(table[curDay]);
      } else {
        result[i].push(0);
      }
      if (currentDate.isSame(lastDate)) break;
      currentDate = currentDate.add(1, "d");
      index++;
    }
    return result;
  }, [records, startDate, endDate]);

  return (
    <ReactApexChart
      type={"heatmap"}
      series={[
        { name: "토", data: data[6] },
        { name: "금", data: data[5] },
        { name: "목", data: data[4] },
        { name: "수", data: data[3] },
        { name: "화", data: data[2] },
        { name: "월", data: data[1] },
        { name: "일", data: data[0] },
      ]}
      options={{
        chart: {
          zoom: { enabled: false },
          toolbar: { show: false },
          background: theme.palette.background.default,
        },
        plotOptions: {
          heatmap: {
            enableShades: false,
            radius: 0,
            colorScale: {
              ranges: [
                {
                  from: 0,
                  to: 0,
                  color: grey[theme.palette.mode === "light" ? 300 : 900],
                  name: "0개",
                },
                {
                  from: 1,
                  to: 1,
                  color: deepOrange[100],
                  name: "1개",
                },
                {
                  from: 2,
                  to: 2,
                  color: deepOrange[300],
                  name: "2개",
                },
                {
                  from: 3,
                  to: 50,
                  color: deepOrange[600],
                  name: "3+개",
                },
              ],
              max: 50,
              min: 0,
            },
          },
        },
        theme: { mode: theme.palette.mode },
        stroke: { show: false },
        dataLabels: { enabled: false },
        xaxis: {
          type: "category",
          categories: _.range(
            dayjs(startDate).week(),
            dayjs(endDate).week() + 1
          ).map((value) => value),
          labels: {
            formatter: (value: string): string | string[] => {
              return value + "주";
            },
          },
        },
        tooltip: { enabled: false },
      }}
      height={height}
    />
  );
};

export default ChannelRecordCalendar;
