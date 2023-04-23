import React, { createContext, useMemo, useState } from "react";
import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";

import VideoChart from "./VideoChart";
import ChannelVideoList from "./ChannelVideoList";
import { useParams } from "react-router";
import HelloChannelVideos from "./HelloChannelVideos";

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
            />
          )}
        </Box>
        <ChannelVideoList channel_id={channelInfo.id} />
      </Stack>
    </CurVideoForChartContext.Provider>
  );
};

export default VideosWithChart;
