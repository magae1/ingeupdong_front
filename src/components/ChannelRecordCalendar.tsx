import React, { useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import { useTheme } from "@mui/material";
import { deepOrange, grey, orange } from "@mui/material/colors";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";

import { ICalendar } from "../utils/interfaces";

dayjs.extend(weekOfYear);

interface IData {
  x: string;
  y: number;
  z: dayjs.Dayjs;
}

const paddingDates = (startDate: string, endDate: string) => {
  const s = dayjs(startDate);
  const e = dayjs(endDate);
  const firstDate = s.subtract(s.day(), "d");
  const lastDate = e.add(6 - e.day(), "d");
  const lw = lastDate.week();
  const fw = firstDate.week();
  return { firstDate, fw, lastDate, lw };
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

  const series = useMemo(() => {
    const { firstDate, fw, lastDate, lw } = paddingDates(startDate, endDate);
    const table: { [key: string]: number } = {};
    records.forEach((value) => {
      table[value.day] = value.value;
    });
    const result: { name: string | undefined; data: IData[] }[] = [];
    let currentDate = firstDate.clone();
    for (let w = fw; w <= lw; w++) {
      const data: IData[] = [];
      for (let d = 0; d < 7; d++) {
        const xValue = daysChar[d];
        const zValue = currentDate.clone();
        if (currentDate.isBefore(startDate)) {
          data.push({ x: xValue, y: -1, z: zValue });
        } else if (!currentDate.isAfter(endDate)) {
          let curDay = currentDate.format("YYYY-MM-DD");
          if (curDay in table)
            data.push({ x: xValue, y: table[curDay], z: zValue });
          else data.push({ x: xValue, y: 0, z: zValue });
        } else {
          data.push({ x: xValue, y: -1, z: zValue });
        }
        currentDate = currentDate.add(1, "d");
      }
      result.push({ name: `${w}`, data: data });
    }
    return result.reverse();
  }, [records, startDate, endDate]);

  return (
    <ReactApexChart
      type={"heatmap"}
      series={series}
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
          customLegendItems: ["0개", "1개", "2개", "3+개"],
          onItemClick: { toggleDataSeries: false },
        },
        theme: { mode: theme.palette.mode },
        stroke: { colors: [theme.palette.divider], width: 2.5 },
        dataLabels: {
          enabled: true,
          formatter: (val, opts) => {
            const currentData =
              series[opts.seriesIndex].data[opts.dataPointIndex].z;
            if (currentData.date() === 1) return currentData.format("M[월]");
            if (currentData.date() % 3 === 0)
              return currentData.format("D[일]");
            return "";
          },
          style: { fontSize: theme.spacing(1.2) },
        },
        xaxis: {
          type: "category",
          position: "top",
          labels: { show: true },
          tooltip: { enabled: false },
        },
        yaxis: { labels: { show: false } },
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
