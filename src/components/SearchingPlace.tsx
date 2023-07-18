import React, { useEffect, useMemo, useRef, useState } from "react";
import _ from "underscore";
import { Box, Grid, LinearProgress, Paper, Stack } from "@mui/material";
import { TrendingUpRounded, Search } from "@mui/icons-material";
import { useScroll } from "@react-spring/web";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";

import {
  HiddenScrollBox,
  InfoLabel,
  RankDiff,
  ScrollProgressBar,
  SearchInputBase,
} from "./styles";
import { IChannel, IScoreWithChannel } from "../utils/interfaces";
import SearchResultBox from "./SearchResultBox";
import { mainFetcher } from "../utils/fetchers";
import ChannelChip from "./ChannelChip";

const SearchingPlace = () => {
  const containerRef = useRef<HTMLDivElement>(null!);
  const [value, setValue] = useState("");
  const [showRank, setShowRank] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const {
    data: resultData,
    error,
    trigger,
    reset,
    isMutating,
  } = useSWRMutation<IChannel[]>(
    value ? `/search?search=${value}` : null,
    mainFetcher
  );
  const { data: rankData } = useSWR<IScoreWithChannel[]>("/rank/", mainFetcher);

  const loadSearchResults = useMemo(
    () =>
      _.debounce(() => {
        trigger()
          .then(() => setLoading(false))
          .catch();
      }, 700),
    []
  );

  useEffect(() => {
    if (value === "") {
      setShowRank(true);
      setLoading(false);
      return undefined;
    }
    setLoading(true);
    setShowRank(false);
    loadSearchResults();
    return () => {};
  }, [value]);

  return (
    <Box height={1}>
      <header>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
          onSubmit={(e) => e.preventDefault()}
        >
          <Search sx={{ fontSize: "1.5em", marginX: "7px" }} />
          <SearchInputBase
            sx={{ fontSize: "1.25em" }}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            placeholder={"채널명을 검색해주세요."}
          />
        </Paper>
      </header>
      <HiddenScrollBox
        ref={containerRef}
        sx={{ marginTop: "1px", height: "calc(100% - 65px)" }}
      >
        <Box sx={{ width: "100%", position: "sticky", top: "0" }}>
          {isLoading ? (
            <LinearProgress color={"secondary"} />
          ) : (
            <ScrollProgressBar
              style={{
                width: scrollYProgress.to((value) => `${value * 100}%`),
              }}
            ></ScrollProgressBar>
          )}
        </Box>
        <Box p={1}>
          {showRank ? (
            <>
              <InfoLabel>
                <TrendingUpRounded sx={{ mr: 0.5, verticalAlign: "middle" }} />
                인기 급상승 채널
              </InfoLabel>
              <Grid container spacing={1} mx={2}>
                {rankData?.map((value, index) => (
                  <Grid item xs={12} sm={6}>
                    <ChannelChip
                      channelId={value.channel.id}
                      channelName={value.channel.name}
                    />
                  </Grid>
                ))}
              </Grid>
            </>
          ) : (
            <Stack spacing={1}>
              {resultData && resultData.length > 0 ? (
                <RankDiff>{`총 ${resultData.length}개의 채널이 있습니다.`}</RankDiff>
              ) : (
                <RankDiff> 검색 결과가 없습니다.</RankDiff>
              )}
              {resultData?.map((v) => (
                <SearchResultBox
                  data={v}
                  input={value}
                  key={_.uniqueId("search-results-with-channel")}
                />
              ))}
            </Stack>
          )}
        </Box>
      </HiddenScrollBox>
    </Box>
  );
};

export default SearchingPlace;
