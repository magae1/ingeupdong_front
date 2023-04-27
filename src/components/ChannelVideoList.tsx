import React, { memo, useMemo } from "react";
import useSWRInfinite from "swr/infinite";
import _ from "underscore";
import { Box } from "@mui/material";
import { Whatshot } from "@mui/icons-material";
import { areEqual, FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

import {
  IChannelVideoWithPagination,
  IVideoWithRecordAt,
} from "../utils/interfaces";
import ChannelVideoBoard from "./ChannelVideoBoard";
import { ErrorTypo, InfoLabel } from "./styles";
import AutoSizer from "react-virtualized-auto-sizer";
import { mainFetcher } from "../utils/fetchers";

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

const ChannelVideoList = (props: { channelId: number }) => {
  const { channelId } = props;
  const { data, isLoading, isValidating, error, setSize, size } =
    useSWRInfinite<IChannelVideoWithPagination>(
      (index, previousPageData) => {
        if (previousPageData && !previousPageData.next) return null;
        if (!index) return `/channel/${channelId}/videos/`;
        return `/channel/${channelId}/videos/?page=${index}`;
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
    <Box sx={{ width: "100%", height: "100%" }}>
      <InfoLabel sx={{ marginBottom: "0px", py: "3px" }}>
        <Whatshot sx={{ mr: 0.5, verticalAlign: "middle" }} />이 채널의 인급동들
      </InfoLabel>
      <div style={{ height: "calc(100% - 31px)", minHeight: "300px" }}>
        <InfiniteLoader
          isItemLoaded={(index) => true}
          loadMoreItems={(startIndex, stopIndex) => {
            setSize((_size) => _size + 1);
          }}
          itemCount={videos.length}
        >
          {({ onItemsRendered, ref }) => (
            <AutoSizer>
              {({ height, width }) => (
                <List
                  itemSize={150}
                  height={height ?? 0}
                  itemCount={videos.length}
                  width={width ?? 0}
                  itemData={videos}
                  onItemsRendered={onItemsRendered}
                >
                  {Row}
                </List>
              )}
            </AutoSizer>
          )}
        </InfiniteLoader>
      </div>
    </Box>
  );
};

export default ChannelVideoList;
