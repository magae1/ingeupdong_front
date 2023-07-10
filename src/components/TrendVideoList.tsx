import React, { useCallback, useEffect, useMemo } from "react";
import _ from "underscore";
import useSWRInfinite from "swr/infinite";
import { Box, Divider, Stack, useMediaQuery, useTheme } from "@mui/material";

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

const TrendVideoList = ({ recordId }: Props) => {
  const theme = useTheme();
  const isMobileSize = useMediaQuery(theme.breakpoints.down("sm"));
  const boardSize = isMobileSize ? 380 : 170;
  const loadCount = Math.ceil(window.innerHeight / boardSize);
  const { data, isLoading, error, size, setSize, isValidating, mutate } =
    useSWRInfinite<ITrendingWithPagination>(
      (index, previousPageData) => {
        let offset = "0";
        if (previousPageData) {
          if (!previousPageData.next) return null;
          offset = previousPageData?.next.match(/offset=([0-9])*/i)[0];
          offset = offset.slice(7, offset.length);
        }
        return `/trending/${recordId}/?offset=${offset}&size=${loadCount}`;
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
    return _.range(loadCount).map(() => (
      <LoadingTrendVideoBoard key={_.uniqueId("loading-trend-video")} />
    ));
  }, []);

  const handleInfiniteScroll = useCallback(
    _.throttle(() => {
      if (isLoading) return;
      let scrollBarSize = window.innerHeight;
      let scrollBarTop = document.documentElement.scrollTop;
      let scrollBarBottom = scrollBarTop + scrollBarSize;
      let pageHeight = document.documentElement.offsetHeight;
      if (scrollBarBottom > pageHeight / 2) {
        if (!isReachingEnd && !isRefreshing && !isLoadingMore) {
          setSize((_size) => _size + 1).then();
        }
      }
    }, 500),
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
