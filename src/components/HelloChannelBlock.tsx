import React from "react";
import useSWR from "swr";
import { useLoaderData, useParams } from "react-router";
import {
  Box,
  CircularProgress,
  Grid,
  Link,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import {
  Home,
  CalendarMonthTwoTone,
  LaunchOutlined,
} from "@mui/icons-material";

import {
  IChannelWithLatestVideo,
  ITotalCountWithCalendars,
} from "../utils/interfaces";
import {
  ChannelInfos,
  ChannelPaper,
  ErrorTypo,
  InfoLabel,
  RankDiff,
  SpinnerBox,
} from "./styles";
import { mainFetcher } from "../utils/fetchers";
import ChannelRecordCalendar from "./ChannelRecordCalendar";
import CountingUpSpan from "./CountingUpSpan";

const CALENDAR_SIZE: number = 270;

const HelloChannelBlock = () => {
  const { channelId } = useParams();
  const { name: channelName, handle: channelHandle } =
    useLoaderData() as IChannelWithLatestVideo;
  const theme = useTheme();
  const { data, isLoading, isValidating, error } =
    useSWR<ITotalCountWithCalendars>(
      `/channel/${channelId}/count/`,
      mainFetcher,
      {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      }
    );

  if (error)
    return (
      <Box width={"100%"} height={"200px"}>
        <ErrorTypo>알 수 없는 에러가 발생했습니다.</ErrorTypo>
      </Box>
    );
  const isStillLoading = !data || isValidating || isLoading;

  return (
    <Grid container>
      <Grid item xs={12} sm={6} p={1}>
        <ChannelPaper>
          <InfoLabel>
            <Home sx={{ mr: 0.5, verticalAlign: "middle" }} />
            채널 소개
          </InfoLabel>
          <Stack py={3} px={1.5}>
            <ChannelInfos>
              {isStillLoading ? (
                <Skeleton height={36} width={100} />
              ) : (
                <Typography sx={{ width: "fit-content" }}>
                  {"Ch. "}
                  <Link
                    href={`https://www.youtube.com/${channelHandle}`}
                    target={"_blank"}
                    fontSize={theme.spacing(3)}
                  >
                    {channelName}
                    <LaunchOutlined
                      sx={{ verticalAlign: "middle", fontSize: "inherit" }}
                    />
                  </Link>
                </Typography>
              )}
              {!isStillLoading ? (
                channelHandle[0] === "@" && <RankDiff>{channelHandle}</RankDiff>
              ) : (
                <Skeleton width={100} />
              )}
            </ChannelInfos>
            <Typography align={"right"}>
              {isStillLoading ? (
                <Skeleton height={28} />
              ) : (
                <>
                  {"총 "}
                  <CountingUpSpan
                    time={1000}
                    count={data.total_count}
                    style={{ fontSize: theme.spacing(4) }}
                  />
                  개의 인급동이 있어요.
                </>
              )}
            </Typography>
          </Stack>
        </ChannelPaper>
      </Grid>
      <Grid item xs={12} sm={6} p={1}>
        <ChannelPaper>
          <InfoLabel>
            <CalendarMonthTwoTone sx={{ mr: 0.5, verticalAlign: "middle" }} />
            최근 인급동 현황
          </InfoLabel>
          {isStillLoading ? (
            <SpinnerBox sx={{ height: `${CALENDAR_SIZE}px` }}>
              <CircularProgress />
            </SpinnerBox>
          ) : (
            <ChannelRecordCalendar
              records={data.recent_records}
              startDate={data.start_date}
              endDate={data.end_date}
              height={CALENDAR_SIZE}
            />
          )}
        </ChannelPaper>
      </Grid>
    </Grid>
  );
};

export default HelloChannelBlock;
