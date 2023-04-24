import React, { createContext, useState } from "react";
import { Box, Grid } from "@mui/material";
import useSWRInfinite from "swr/infinite";

import VideoChart from "./VideoChart";
import ChannelVideoList from "./ChannelVideoList";
import HelloChannelVideos from "./HelloChannelVideos";
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
  const { channelInfo } = props;
  const infiniteResponse = useSWRInfinite<IChannelVideoWithPagination>(
    (index, previousPageData) => {
      if (previousPageData && !previousPageData.next) return null;
      if (!index) return `/channel/${channelInfo.id}/videos/`;
      return `/channel/${channelInfo.id}/videos/?page=${index}`;
    },
    mainFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
    }
  );
  const [curVideoId, setVideoId] = useState<IVideoInfo | null>(null);

  return (
    <CurVideoForChartContext.Provider
      value={{
        currentVideo: curVideoId,
        setCurrentVideo: setVideoId,
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12} sm={7}>
          {curVideoId ? (
            <VideoChart />
          ) : (
            <HelloChannelVideos
              channelName={channelInfo.name}
              channelHandle={channelInfo.handle}
              infiniteResponse={infiniteResponse}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={5}>
          <ChannelVideoList infiniteResponse={infiniteResponse} />
        </Grid>
      </Grid>
    </CurVideoForChartContext.Provider>
  );
};

export default VideosWithChart;
