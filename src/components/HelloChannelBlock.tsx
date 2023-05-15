import React, { useCallback } from "react";
import useSWR from "swr";
import { useLoaderData, useParams } from "react-router";
import {
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
  InfoLabel,
  RankDiff,
  SpinnerBox,
} from "./styles";
import { mainFetcher } from "../utils/fetchers";
import ChannelRecordCalendar from "./ChannelRecordCalendar";
import CountingUpSpan from "./CountingUpSpan";
import ErrorRetry from "./ErrorRetry";

const CALENDAR_SIZE: number = 300;

const HelloChannelBlock = () => {
  const { channelId } = useParams();
  const { name: channelName, handle: channelHandle } =
    useLoaderData() as IChannelWithLatestVideo;
  const theme = useTheme();
  const { data, isLoading, isValidating, error, mutate } =
    useSWR<ITotalCountWithCalendars>(
      `/channel/${channelId}/count/`,
      mainFetcher,
      {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      }
    );
  const retrySWR = useCallback(() => mutate().then(), []);

  if (error) return <ErrorRetry onClickRetry={retrySWR} />;
  const isStillLoading = !data || isValidating || isLoading;

  return (
    <Grid container>
      <Grid item xs={12} sm={6} md={7} p={1}>
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
      <Grid item xs={12} sm={6} md={5} p={1}>
        <ChannelPaper>
          <InfoLabel>
            <CalendarMonthTwoTone sx={{ mr: 0.5, verticalAlign: "middle" }} />
            최근 인급동 현황
          </InfoLabel>
          {isStillLoading ? (
            <SpinnerBox sx={{ height: `${CALENDAR_SIZE + 15}px` }}>
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
