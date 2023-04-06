import React, { useMemo } from "react";
import useSWRInfinite from "swr/infinite";
import _ from "underscore";

import { IChannelVideoWithPagination } from "../utils/interfaces";
import { mainFetcher } from "../utils/fetchers";
import ChannelVideoBoard from "./ChannelVideoBoard";
import { Stack } from "@mui/material";

const SIZE = 10;

const ChannelVideoList = (props: { channel_id: number }) => {
  const { channel_id } = props;
  const { data, isLoading, error, size, setSize, isValidating } =
    useSWRInfinite<IChannelVideoWithPagination>(
      (index, previousPageData) => {
        if (previousPageData && !previousPageData.next) return null;
        return `/video/?channel_id=${channel_id}&offset=${
          index * SIZE
        }&size=${SIZE}`;
      },
      mainFetcher,
      {
        revalidateIfStale: false,
        revalidateOnFocus: false,
      }
    );

  const videos = useMemo(
    () =>
      _.chain(data)
        .map((value) => value.results)
        .flatten()
        .map((value) => (
          <ChannelVideoBoard data={value} key={_.uniqueId("trend-video")} />
        ))
        .value(),
    [data]
  );

  return (
    <Stack spacing={1} my={3}>
      {videos}
    </Stack>
  );
};

export default ChannelVideoList;
