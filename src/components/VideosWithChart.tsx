import React, { createContext, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import useSWRInfinite from "swr/infinite";

import VideoChart from "./VideoChart";
import ChannelVideoList from "./ChannelVideoList";
import { IChannelVideoWithPagination } from "../utils/interfaces";
import { mainFetcher } from "../utils/fetchers";

interface IVideoInfo {
  videoId: number;
  videoTitle: string;
}
interface ICurVideoForChartContext {
  currentVideo: IVideoInfo | null;
  setCurrentVideo: (input: IVideoInfo | null) => void;
}

export const CurVideoForChartContext = createContext<ICurVideoForChartContext>({
  currentVideo: null,
  setCurrentVideo: () => {},
});

const VideosWithChart = (props: {
  channelInfo: { id: number; name: string; handle: string };
}) => {
  const { id: channelId } = props.channelInfo;

  const [curVideoId, setVideoId] = useState<IVideoInfo | null>(null);

  useEffect(() => {
    return () => {
      setVideoId(null);
    };
  }, [channelId]);

  return (
    <CurVideoForChartContext.Provider
      value={{
        currentVideo: curVideoId,
        setCurrentVideo: setVideoId,
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12} sm={5}>
          {curVideoId && <VideoChart />}
        </Grid>
        <Grid item xs={12} sm={7}>
          <ChannelVideoList channelId={channelId} />
        </Grid>
      </Grid>
    </CurVideoForChartContext.Provider>
  );
};

export default VideosWithChart;
