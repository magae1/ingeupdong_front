import React, { useCallback, useMemo, useState } from "react";
import _ from "underscore";
import { Stack, Box, Button, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import useSWR from "swr";

import { IChannelVideoWithPagination } from "../utils/interfaces";
import ChannelVideoBoard from "./ChannelVideoBoard";
import { ChannelVideoPageButtonsBox } from "./styles";
import { mainFetcher } from "../utils/fetchers";
import LoadingChannelVideoBoard from "./LoadingChannelVideoBoard";
import ErrorRetry from "./ErrorRetry";

const ChannelVideoList = (props: { channelId: number }) => {
  const { channelId } = props;
  const [currentPage, setPage] = useState(1);
  const { data, isLoading, isValidating, error, mutate } =
    useSWR<IChannelVideoWithPagination>(
      `/channel/${channelId}/videos/?page=${currentPage}`,
      mainFetcher,
      {
        revalidateIfStale: false,
        revalidateOnFocus: false,
      }
    );

  const videos = useMemo(() => {
    if (!data || isLoading || isValidating) {
      return _.range(5).map(() => (
        <LoadingChannelVideoBoard key={_.uniqueId("loading-channel-video")} />
      ));
    } else {
      return _.chain(data.results)
        .map((value) => (
          <ChannelVideoBoard data={value} key={_.uniqueId("channel-video")} />
        ))
        .value();
    }
  }, [data]);

  const retryDataLoad = useCallback(() => mutate().then(), []);

  if (error) return <ErrorRetry onClickRetry={retryDataLoad} />;

  return (
    <Box minHeight={500} display={"flex"} flexDirection={"column"}>
      <Stack spacing={1.5}>{videos}</Stack>
      <ChannelVideoPageButtonsBox pt={1} pb={0.5}>
        <Button
          disabled={!data?.previous}
          onClick={() => setPage((prevState) => prevState - 1)}
        >
          이전
        </Button>
        <Typography
          sx={{
            pt: 1.2,
            textAlign: "center",
            fontSize: "12px",
            color: grey[600],
          }}
        >
          {currentPage}페이지
        </Typography>
        <Button
          disabled={!data?.next}
          onClick={() => setPage((prevState) => prevState + 1)}
        >
          다음
        </Button>
      </ChannelVideoPageButtonsBox>
    </Box>
  );
};

export default ChannelVideoList;
