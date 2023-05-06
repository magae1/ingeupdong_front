import React, { useCallback, useEffect, useMemo } from "react";
import _ from "underscore";
import useSWRInfinite from "swr/infinite";
import { Box, CircularProgress, Stack } from "@mui/material";

import { ITrendingWithPagination } from "../utils/interfaces";
import { mainFetcher } from "../utils/fetchers";
import {
  CenterFlexDiv,
  ErrorTypo,
  SpinnerBox,
  TrendVideoDivider,
} from "./styles";
import TrendVideoBoard from "./TrendVideoBoard";
import ScrollToTopButton from "./ScrollToTopButton";

interface Props {
  recordId: string;
}

const SIZE = 10;
const TrendVideoList = ({ recordId }: Props) => {
  const { data, isLoading, error, size, setSize, isValidating } =
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

  const handleInfiniteScroll = useCallback(
    _.throttle(() => {
      let footerSize =
        document.getElementsByTagName("footer").item(0)?.offsetHeight ?? 0;
      let scrollBarSize = window.innerHeight;
      let scrollBarTop = document.documentElement.scrollTop;
      let scrollBarBottom = scrollBarTop + scrollBarSize;
      let pageHeight = document.documentElement.offsetHeight;
      if (scrollBarBottom > pageHeight - 2 * footerSize) {
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

  if (error) return <ErrorTypo>알 수 없는 오류가 발생했어요.</ErrorTypo>;

  return (
    <Box mb={2}>
      <Stack spacing={2} mb={3} divider={<TrendVideoDivider />}>
        {trends}
        {isLoadingMore && (
          <SpinnerBox>
            <CircularProgress />
          </SpinnerBox>
        )}
      </Stack>
      {!isEmpty && isReachingEnd && (
        <CenterFlexDiv>
          <ScrollToTopButton />
        </CenterFlexDiv>
      )}
    </Box>
  );
};

export default TrendVideoList;
