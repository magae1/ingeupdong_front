import React from "react";
import useSWR from "swr";
import { useParams } from "react-router";
import { Box, Grid } from "@mui/material";

import { ITotalCountWithCalendars } from "../utils/interfaces";
import { ErrorTypo } from "./styles";
import { mainFetcher } from "../utils/fetchers";
import ChannelDescriptions from "./ChannelDescriptions";

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
  return (
    <Grid container>
      <Grid item xs={12}>
        {!isValidating && !isLoading && (
          <ChannelDescriptions totalCount={data.total_count} />
        )}
      </Grid>
    </Grid>
  );
};

export default HelloChannelBlock;
