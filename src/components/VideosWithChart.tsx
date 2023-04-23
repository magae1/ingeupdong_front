import React, { createContext, useState } from "react";
import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";

import VideoChart from "./VideoChart";
import ChannelVideoList from "./ChannelVideoList";
import HelloChannelVideos from "./HelloChannelVideos";
import useSWRInfinite from "swr/infinite";
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
  const theme = useTheme();
  const isXS = useMediaQuery(theme.breakpoints.down("sm"));
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
      <Stack direction={isXS ? "column" : "row"} spacing={1}>
        <Box minHeight={"250px"} minWidth={"300px"} width={"100%"}>
          {curVideoId ? (
            <VideoChart />
          ) : (
            <HelloChannelVideos
              channelName={channelInfo.name}
              channelHandle={channelInfo.handle}
              infiniteResponse={infiniteResponse}
            />
          )}
        </Box>
        <ChannelVideoList infiniteResponse={infiniteResponse} />
      </Stack>
    </CurVideoForChartContext.Provider>
  );
};

export default VideosWithChart;
