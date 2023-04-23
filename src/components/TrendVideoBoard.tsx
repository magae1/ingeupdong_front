import React, { memo } from "react";
import { Grid, Stack } from "@mui/material";

import { ITrendingWithPrev } from "../utils/interfaces";
import RankDiffBox from "./RankDiffBox";
import ChannelChip from "./ChannelChip";
import ThumbnailBox from "./ThumbnailBox";
import ViewsWithDetails from "./ViewsWithDetails";
import { TrendVideoWrapper } from "./styles";

interface Props {
  data: ITrendingWithPrev;
}

const TrendVideoBoard = ({ data }: Props) => {
  const { prev_trend, video, rank, views } = data;

  return (
    <TrendVideoWrapper>
      <Grid container width={1} sx={{ minHeight: "140px" }}>
        <Grid item xs={2} sm={1.5} md={1}>
          <RankDiffBox prevRank={prev_trend?.rank} curRank={rank} />
        </Grid>
        <Grid item xs={10} sm={7} md={7} px={1}>
          <Stack my={2} spacing={0.5}>
            <ChannelChip
              channelName={video.channel.name}
              channelId={video.channel.id}
            />
            <span>{video.title}</span>
            <ViewsWithDetails curViews={views} prevViews={prev_trend?.views} />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={3.5} md={4}>
          <ThumbnailBox video={video} />
        </Grid>
      </Grid>
    </TrendVideoWrapper>
  );
};

export default memo(TrendVideoBoard);
