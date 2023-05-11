import React, { useContext, useMemo } from "react";
import { CircularProgress, useTheme } from "@mui/material";
import { indigo } from "@mui/material/colors";
import useSWR from "swr";
import ReactApexChart from "react-apexcharts";
import dayjs from "dayjs";
import _ from "underscore";

import { numWithDot, shortenNum } from "../utils/formatters";
import { TrendForGraph } from "../utils/interfaces";
import { mainFetcher } from "../utils/fetchers";
import { ChartWrapper, SpinnerBox } from "./styles";
import { CurVideoForChartContext } from "./VideosWithChartBlock";

const VideoChart = () => {
  const theme = useTheme();
  const { currentVideo } = useContext(CurVideoForChartContext);
  const { data: video_data } = useSWR<TrendForGraph[]>(
    !currentVideo ? null : `/video/${currentVideo.videoId}/graphed/`,
    mainFetcher
  );
  const reformattedData = useMemo(() => {
    const viewsData: { x: string; y: number }[] = [];
    const rankData: { x: string; y: number }[] = [];
    const annotationDate: { date: string; rank: number }[] = [];
    let highestRank = 50;
    let lowestRank = 1;
    let prevDay: string | null = null;
    video_data?.forEach((value) => {
      if (prevDay) {
        const prev = dayjs(prevDay);
        if (prev.diff(value.day, "hour") < -12) {
          annotationDate.push({ date: value.day, rank: value.rank });
        }
      }
      viewsData.push({ x: value.day, y: value.views });
      rankData.push({ x: value.day, y: value.rank });
      highestRank = Math.min(highestRank, value.rank);
      lowestRank = Math.max(lowestRank, value.rank);
      prevDay = value.day;
    });
    return {
      series: [
        { name: "조회수", type: "area", data: viewsData },
        { name: "순위", type: "line", data: rankData },
      ],
      rankRange: [highestRank, lowestRank],
      annotations: annotationDate,
    };
  }, [video_data]);

  return (
    <ChartWrapper>
      {video_data ? (
        <ReactApexChart
          options={{
            annotations: {
              xaxis: reformattedData.annotations.map((value) => ({
                x: new Date(value.date).getTime(),
                strokeDashArray: 0,
                borderColor: indigo[400],
                label: {
                  borderColor: indigo[400],
                  style: {
                    color: "#fff",
                    background: indigo[400],
                    fontWeight: 700,
                  },
                  orientation: "horizontal",
                  offsetY: value.rank < 25 ? 240 : -3,
                  text: "재진입!",
                },
              })),
            },
            xaxis: {
              type: "datetime",
              labels: {
                style: {
                  colors: theme.palette.mode === "light" ? "#000" : "#fff",
                },
                datetimeUTC: false,
                datetimeFormatter: {
                  year: "yyyy년",
                  month: "yy년 MMM",
                  day: "MMM d일",
                  hour: "d일 HH:mm",
                },
              },
            },
            yaxis: [
              {
                title: {
                  text: "조회수",
                  style: {
                    color: theme.palette.mode === "light" ? "#333" : "#ddd",
                  },
                },
                labels: {
                  style: {
                    colors: theme.palette.mode === "light" ? "#000" : "#fff",
                  },
                  formatter: (val: number | null): string | string[] => {
                    if (val) return shortenNum(val).toString();
                    return [];
                  },
                },
              },
              {
                show: false,
                opposite: true,
                reversed: true,
                title: {
                  text: "순위",
                },
                min:
                  reformattedData.rankRange[0] === 1
                    ? 1
                    : reformattedData.rankRange[0] - 1,
                max:
                  reformattedData.rankRange[1] === 50
                    ? 50
                    : reformattedData.rankRange[1] + 1,
                labels: {
                  style: {
                    colors: theme.palette.mode === "light" ? "#000" : "#fff",
                  },
                },
              },
            ],
            chart: {
              zoom: { enabled: false },
              toolbar: { show: false },
              defaultLocale: "ko",
              locales: [
                {
                  name: "ko",
                  options: {
                    months: _.range(1, 13).map((value) => `${value}월`),
                    shortMonths: _.range(1, 13).map((value) => `${value}월`),
                    days: [
                      "일요일",
                      "월요일",
                      "화요일",
                      "수요일",
                      "목요일",
                      "금요일",
                      "토요일",
                    ],
                    shortDays: ["일", "월", "화", "수", "목", "금", "토"],
                  },
                },
              ],
            },
            fill: {
              opacity: [0.2, 1],
              type: ["gradient", "solid"],
              gradient: {
                type: "vertical",
                shade: theme.palette.mode,
                shadeIntensity: 1,
                opacityFrom: [1],
                opacityTo: 0.2,
                stops: [0, 70, 100],
                colorStops: [
                  [
                    {
                      offset: 0,
                      color: theme.palette.primary.main,
                      opacity: 1,
                    },
                    {
                      offset: 0.6,
                      color: theme.palette.primary.main,
                      opacity: 0.5,
                    },
                    {
                      offset: 100,
                      color: theme.palette.primary.main,
                      opacity: 0,
                    },
                  ],
                ],
              },
            },
            stroke: {
              curve: "straight",
              width: [1, 3],
            },
            markers: {
              size: [5, 0],
              hover: { size: 9 },
            },
            dataLabels: {
              enabled: true,
              enabledOnSeries: [1],
            },
            colors: [
              theme.palette.primary.light,
              theme.palette.secondary.light,
            ],
            legend: { show: false },
            tooltip: {
              enabled: true,
              shared: true,
              theme: theme.palette.mode,
              x: {
                show: true,
                formatter: (val: number) =>
                  dayjs(val).locale("ko").format("M.D(dd) A h시"),
              },
              y: [
                {
                  formatter: (val: number | null) => {
                    if (val) return shortenNum(val) + "회";
                    return "";
                  },
                },
                {
                  formatter: (val: number | null) => {
                    if (val) return numWithDot(val) + "위";
                    return "";
                  },
                },
              ],
            },
          }}
          series={reformattedData.series}
          height={"300px"}
        />
      ) : (
        <SpinnerBox sx={{ height: "300px" }}>
          <CircularProgress />
        </SpinnerBox>
      )}
    </ChartWrapper>
  );
};
export default VideoChart;
