import React from "react";
import useSWR from "swr";
import { useParams } from "react-router";
import { Box, CircularProgress, Grid } from "@mui/material";

import { ITotalCountWithCalendars } from "../utils/interfaces";
import { ErrorTypo, SpinnerBox } from "./styles";
import { mainFetcher } from "../utils/fetchers";
import ChannelDescriptions from "./ChannelDescriptions";
import ChannelRecordCalendar from "./ChannelRecordCalendar";

const CALENDAR_SIZE = 300;

const HelloChannelBlock = () => {
  const { channelId } = useParams();
  const { data, isLoading, isValidating, error } =
    useSWR<ITotalCountWithCalendars>(
      `/channel/${channelId}/count/`,
      mainFetcher,
      {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      }
    );

  if (!data || error)
    return (
      <Box width={"100%"} height={"200px"}>
        <ErrorTypo>알 수 없는 에러가 발생했습니다.</ErrorTypo>
      </Box>
    );
  const { total_count, recent_records, start_date, end_date } = data;
  return (
    <Grid container>
      <Grid item xs={12} sm={6}>
        {!isValidating && !isLoading && (
          <ChannelDescriptions totalCount={total_count} />
        )}
      </Grid>
      <Grid item xs={12} sm={6}>
        {isLoading || isValidating ? (
          <SpinnerBox sx={{ height: `${CALENDAR_SIZE}px` }}>
            <CircularProgress />
          </SpinnerBox>
        ) : (
          <ChannelRecordCalendar
            records={recent_records}
            startDate={start_date}
            endDate={end_date}
            height={CALENDAR_SIZE}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default HelloChannelBlock;
