import React, { useMemo } from "react";
import useSWRInfinite from "swr/infinite";
import _ from "underscore";

import {
  IChannelVideoWithPagination,
  IVideoWithRecordAt,
} from "../utils/interfaces";
import { mainFetcher } from "../utils/fetchers";
import ChannelVideoBoard from "./ChannelVideoBoard";
import { Stack } from "@mui/material";
import useSWR from "swr";

const SIZE = 10;

const ChannelVideoList = (props: { channel_id: number }) => {
  const { channel_id } = props;
  const { data, isLoading, error, isValidating } = useSWR<IVideoWithRecordAt[]>(
    `/channel/${channel_id}/videos`,
    mainFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
    }
  );

  const videos = useMemo(
    () =>
      _.chain(data)
        // .map((value) => value)
        // .flatten()
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
