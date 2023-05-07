import React, { memo } from "react";
import {
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { ITrendingWithPrev } from "../utils/interfaces";
import RankDiffBox from "./RankDiffBox";
import ChannelChip from "./ChannelChip";
import ThumbnailBox from "./ThumbnailBox";
import ViewsWithDetails from "./ViewsWithDetails";
import { VideoTitleTypo } from "./styles";

interface Props {
  data: ITrendingWithPrev;
}

const TrendVideoBoard = ({ data }: Props) => {
  const theme = useTheme();
  const smallerSM = useMediaQuery(theme.breakpoints.down("sm"));
  const { prev_trend, video, rank, views } = data;

  return (
    <Grid container width={1} sx={{ minHeight: "150px" }}>
      <Grid item xs={2} sm={1.5} md={1}>
        <RankDiffBox prevRank={prev_trend?.rank} curRank={rank} />
      </Grid>
      <Grid item xs={10} sm={6} md={7} px={1}>
        <Stack my={2} spacing={0.5}>
          <ChannelChip
            channelName={video.channel.name}
            channelId={video.channel.id}
          />
          {smallerSM ? (
            <Typography sx={{ fontWeight: 500 }}>{video.title}</Typography>
          ) : (
            <VideoTitleTypo>{video.title}</VideoTitleTypo>
          )}
          <ViewsWithDetails curViews={views} prevViews={prev_trend?.views} />
        </Stack>
      </Grid>
      <Grid item xs={12} sm={4.5} md={4}>
        <ThumbnailBox video={video} />
      </Grid>
    </Grid>
  );
};

export default memo(TrendVideoBoard);
