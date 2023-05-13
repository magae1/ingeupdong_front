import React, { useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import { useTheme } from "@mui/material";
import { deepOrange, grey, orange } from "@mui/material/colors";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";

import { ICalendar } from "../utils/interfaces";

dayjs.extend(weekOfYear);

interface IData {
  x: dayjs.Dayjs;
  y: number;
}

const paddingDates = (startDate: string, endDate: string) => {
  const s = dayjs(startDate);
  const e = dayjs(endDate);
  const firstDate = s.subtract(s.day(), "d");
  const lastDate = e.add(6 - e.day(), "d");
  return { firstDate, lastDate };
};

const daysChar = ["일", "월", "화", "수", "목", "금", "토"];

const ChannelRecordCalendar = (props: {
  records: ICalendar[];
  startDate: string;
  endDate: string;
  height: number;
}) => {
  const theme = useTheme();
  const { records, startDate, endDate, height } = props;

  const data = useMemo(() => {
    const { firstDate, lastDate } = paddingDates(startDate, endDate);
    const table: { [key: string]: number } = {};
    records.forEach((value) => {
      table[value.day] = value.value;
    });
    const result: IData[][] = [[]];
    for (let k = 0; k < 6; k++) result.push([]);
    let index = 0;
    let currentDate = firstDate.clone();
    while (currentDate.isBefore(startDate)) {
      let i = index % 7;
      result[i].push({ x: currentDate.clone(), y: -1 });
      currentDate = currentDate.add(1, "d");
      index++;
    }
    do {
      let i = index % 7;
      let curDay = currentDate.format("YYYY-MM-DD");
      if (curDay in table)
        result[i].push({ x: currentDate.clone(), y: table[curDay] });
      else result[i].push({ x: currentDate.clone(), y: 0 });
      currentDate = currentDate.add(1, "d");
      index++;
    } while (!currentDate.isAfter(endDate));
    return daysChar.map((v, index) => ({ name: v, data: result[index] }));
  }, [records, startDate, endDate]);
  return (
    <ReactApexChart
      type={"heatmap"}
      series={data}
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
                  color: grey[500],
                  name: "0개",
                },
                {
                  from: 1,
                  to: 1,
                  color: orange[200],
                  name: "1개",
                },
                {
                  from: 2,
                  to: 2,
                  color: orange[500],
                  name: "2개",
                },
                {
                  from: 3,
                  to: 50,
                  color: deepOrange[700],
                  name: "3+개",
                },
                {
                  from: -1,
                  to: -1,
                  color: theme.palette.divider,
                  name: "X",
                },
              ],
              max: 50,
              min: -1,
            },
          },
        },
        legend: {
          customLegendItems: ["0개", "1개", "2개", "3+"],
          onItemClick: { toggleDataSeries: false },
        },
        theme: { mode: theme.palette.mode },
        stroke: { colors: [theme.palette.divider], width: 2.5 },
        dataLabels: {
          enabled: true,
          formatter: (val, opts) => {
            const currentData =
              data[opts.seriesIndex].data[opts.dataPointIndex].x;
            if (currentData.date() === 1) return currentData.format("M[월]");
            return currentData.format("D");
          },
          style: { fontSize: theme.spacing(1.2) },
        },
        xaxis: {
          type: "category",
          labels: { show: false },
          tooltip: { enabled: false },
        },
        yaxis: { reversed: true },
        states: {
          active: { filter: { type: "none" } },
          hover: { filter: { type: "none" } },
        },
        tooltip: { enabled: false },
      }}
      height={height}
    />
  );
};

export default ChannelRecordCalendar;
