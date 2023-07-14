import React, { useEffect, useMemo, useRef, useState } from "react";
import _ from "underscore";
import { Box, LinearProgress, Paper, Stack } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useScroll } from "@react-spring/web";
import useSWRMutation from "swr/mutation";

import {
  HiddenScrollBox,
  RankDiff,
  ScrollProgressBar,
  SearchInputBase,
} from "./styles";
import { IChannel } from "../utils/interfaces";
import SearchResultBox from "./SearchResultBox";
import { mainFetcher } from "../utils/fetchers";

const SearchingPlace = (props: { onCloseModal: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null!);
  const [value, setValue] = useState("");
  const [showRank, setShowRank] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const { data, error, trigger, reset, isMutating } = useSWRMutation<
    IChannel[]
  >(value ? `/search?search=${value}` : null, mainFetcher);

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
        <Stack spacing={1} mx={2} my={1}>
          {data && data.length > 0 ? (
            <RankDiff>{`총 ${data.length}개의 채널이 있습니다.`}</RankDiff>
          ) : (
            <RankDiff> 검색 결과가 없습니다.</RankDiff>
          )}
          {data?.map((v) => (
            <SearchResultBox
              data={v}
              input={value}
              onCloseModal={props.onCloseModal}
              key={_.uniqueId("search-results-with-channel")}
            />
          ))}
        </Stack>
      </HiddenScrollBox>
    </Box>
  );
};

export default SearchingPlace;
