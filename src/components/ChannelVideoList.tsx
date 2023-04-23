import React, { memo, useMemo } from "react";
import useSWRInfinite from "swr/infinite";
import _ from "underscore";
import { Box, Stack } from "@mui/material";

import {
  IChannelVideoWithPagination,
  IVideoWithRecordAt,
} from "../utils/interfaces";
import { mainFetcher } from "../utils/fetchers";
import ChannelVideoBoard from "./ChannelVideoBoard";
import { ErrorTypo, InfoLabel } from "./styles";
import { Whatshot } from "@mui/icons-material";
import { areEqual, FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

const Row = memo(
  (props: { data: IVideoWithRecordAt[]; index: number; style?: {} }) => {
    const { data, index, style } = props;
    const item = data[index];

    return (
      <div style={style}>
        <ChannelVideoBoard data={item} />
      </div>
    );
  },
  areEqual
);

const ChannelVideoList = (props: { channel_id: number }) => {
  const { channel_id } = props;
  const { data, isLoading, error, size, setSize, isValidating } =
    useSWRInfinite<IChannelVideoWithPagination>(
      (index, previousPageData) => {
        if (previousPageData && !previousPageData.next) return null;
        if (!index) return `/channel/${channel_id}/videos/`;
        return `/channel/${channel_id}/videos/?page=${index}`;
      },
      mainFetcher,
      {
        revalidateIfStale: false,
        revalidateOnFocus: false,
      }
    );
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = !data || data[0].count === 0;
  const isReachingEnd = isEmpty || !data?.[data?.length - 1].next;
  const isRefreshing = isValidating && data && data.length === size;

  const videos = useMemo(
    () =>
      _.chain(data)
        .map((value) => value.results)
        .flatten()
        .value(),
    [data]
  );

  if (error) return <ErrorTypo>알 수 없는 오류가 발생했어요.</ErrorTypo>;

  return (
    <Box
      sx={{
        maxHeight: "500px",
        width: "100%",
        height: "50vh",
        maxWidth: "450px",
      }}
    >
      <InfoLabel sx={{ marginBottom: "0px", py: "3px" }}>
        <Whatshot sx={{ mr: 0.5, verticalAlign: "middle" }} />이 채널의 인급동들
      </InfoLabel>
      <InfiniteLoader
        isItemLoaded={(index) => true}
        loadMoreItems={(startIndex, stopIndex) => {
          setSize((_size) => _size + 1);
        }}
        itemCount={videos.length}
      >
        {({ onItemsRendered, ref }) => (
          <List
            itemSize={150}
            height={400}
            itemCount={videos.length}
            width={"100%"}
            itemData={videos}
            onItemsRendered={onItemsRendered}
          >
            {Row}
          </List>
        )}
      </InfiniteLoader>
    </Box>
  );
};

export default ChannelVideoList;
