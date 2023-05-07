import React, { useContext, useMemo } from "react";
import { CircularProgress, useTheme } from "@mui/material";
import useSWR from "swr";
import ReactApexChart from "react-apexcharts";
import dayjs from "dayjs";

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
    const viewsData: (number | null)[] = [];
    const rankData: (number | null)[] = [];
    const dayData: string[] = [];
    let highestRank = 50;
    let lowestRank = 1;
    let prevDay: string | null = null;
    video_data?.forEach((value) => {
      if (prevDay) {
        const prev = dayjs(prevDay);
        if (prev.diff(value.day, "hour") < -12) {
          viewsData.push(null);
          rankData.push(null);
          dayData.push("...");
        }
      }
      viewsData.push(value.views);
      rankData.push(value.rank);
      dayData.push(value.day);
      highestRank = Math.min(highestRank, value.rank);
      lowestRank = Math.max(lowestRank, value.rank);
      prevDay = value.day;
    });
    return {
      series: [
        { name: "조회수", type: "area", data: viewsData },
        { name: "순위", type: "line", data: rankData },
      ],
      labels: dayData,
      rankRange: [highestRank, lowestRank],
    };
  }, [video_data]);

  return (
    <ChartWrapper>
      {video_data ? (
        <ReactApexChart
          options={{
            labels: reformattedData.labels,
            xaxis: {
              type: "category",
              tickPlacement: "on",
              labels: {
                formatter: (value) => {
                  if (value === "...") return value;
                  return dayjs(value).locale("ko").format("M.D(dd) A h시");
                },
                style: {
                  colors: theme.palette.mode === "light" ? "#000" : "#fff",
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
              zoom: {
                enabled: false,
              },
              toolbar: {
                show: false,
              },
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
              hover: {
                size: 9,
              },
            },
            dataLabels: {
              enabled: true,
              enabledOnSeries: [1],
            },
            colors: [
              theme.palette.primary.light,
              theme.palette.secondary.light,
            ],
            legend: {
              show: false,
            },
            tooltip: {
              enabled: true,
              shared: true,
              theme: theme.palette.mode,
              x: {
                show: true,
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
