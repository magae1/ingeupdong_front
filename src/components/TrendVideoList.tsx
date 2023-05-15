import React, { useCallback, useEffect, useMemo } from "react";
import _ from "underscore";
import useSWRInfinite from "swr/infinite";
import { Box, Divider, Stack } from "@mui/material";

import { ITrendingWithPagination } from "../utils/interfaces";
import { mainFetcher } from "../utils/fetchers";
import { CenterFlexBox } from "./styles";
import TrendVideoBoard from "./TrendVideoBoard";
import ScrollToTopButton from "./ScrollToTopButton";
import LoadingTrendVideoBoard from "./LoadingTrendVideoBoard";
import ErrorRetry from "./ErrorRetry";

interface Props {
  recordId: string;
}

const SIZE = 10;
const TrendVideoList = ({ recordId }: Props) => {
  const { data, isLoading, error, size, setSize, isValidating, mutate } =
    useSWRInfinite<ITrendingWithPagination>(
      (index, previousPageData) => {
        if (previousPageData && !previousPageData.next) return null;
        return `/trending/${recordId}/?offset=${index * SIZE}&size=${SIZE}`;
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
  const trends = useMemo(
    () =>
      _.chain(data)
        .map((value) => value.results)
        .flatten()
        .map((value) => (
          <TrendVideoBoard data={value} key={_.uniqueId("trend-video")} />
        ))
        .value(),
    [data]
  );

  const retrySWR = useCallback(() => mutate().then(), []);

  const loadingBoards = useMemo(() => {
    return _.range(SIZE).map(() => (
      <LoadingTrendVideoBoard key={_.uniqueId("loading-trend-video")} />
    ));
  }, []);

  const handleInfiniteScroll = useCallback(
    _.throttle(() => {
      if (isLoading) return;
      let footerSize =
        document.getElementsByTagName("footer").item(0)?.offsetHeight ?? 200;
      let scrollBarSize = window.innerHeight;
      let scrollBarTop = document.documentElement.scrollTop;
      let scrollBarBottom = scrollBarTop + scrollBarSize;
      let pageHeight = document.documentElement.offsetHeight;
      if (scrollBarBottom > pageHeight - 3 * footerSize) {
        if (!isReachingEnd && !isRefreshing && !isLoadingMore) {
          setSize((_size) => _size + 1).then();
        }
      }
    }, 300),
    [isRefreshing, isReachingEnd, isLoadingMore]
  );
  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => {
      window.removeEventListener("scroll", handleInfiniteScroll);
    };
  }, [handleInfiniteScroll]);

  if (error) return <ErrorRetry onClickRetry={retrySWR} />;

  return (
    <Box mb={2}>
      <Stack spacing={2} mb={3} divider={<Divider />}>
        {trends}
        {isLoadingMore && loadingBoards}
      </Stack>
      {!isEmpty && isReachingEnd && (
        <CenterFlexBox>
          <ScrollToTopButton />
        </CenterFlexBox>
      )}
    </Box>
  );
};

export default TrendVideoList;
