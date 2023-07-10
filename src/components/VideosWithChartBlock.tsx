import React, { createContext, useEffect, useState } from "react";
import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Whatshot, Timeline } from "@mui/icons-material";
import { grey } from "@mui/material/colors";

import VideoChart from "./VideoChart";
import ChannelVideoList from "./ChannelVideoList";
import { CenterFlexBox, ChannelPaper, InfoLabel } from "./styles";

interface IVideoInfo {
  videoId: number;
  videoTitle: string;
}
interface ICurVideoForChartContext {
  currentVideo: IVideoInfo | null;
  setCurrentVideo: (
    input: () => null | { videoId: number; videoTitle: string }
  ) => void;
}

export const CurVideoForChartContext = createContext<ICurVideoForChartContext>({
  currentVideo: null,
  setCurrentVideo: () => {},
});

const VideosWithChartBlock = (props: {
  channelInfo: { id: number; name: string; handle: string };
}) => {
  const theme = useTheme();
  const { id: channelId } = props.channelInfo;
  const isMobileSize = useMediaQuery(theme.breakpoints.down("sm"));
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
      <Grid container>
        {!isMobileSize && (
          <Grid item xs={12} sm={5.5} p={1}>
            <ChannelPaper sx={{ height: "inherit" }}>
              <InfoLabel>
                <Timeline sx={{ mr: 0.5, verticalAlign: "middle" }} />
                {curVideoId ? (
                  <span
                    style={{
                      display: "inline-block",
                      height: "100%",
                      fontSize: "inherit",
                      width: "calc(100% - 35px)",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      verticalAlign: "middle",
                    }}
                  >
                    {curVideoId.videoTitle}
                  </span>
                ) : (
                  "영상 추이"
                )}
              </InfoLabel>
              {curVideoId ? (
                <VideoChart />
              ) : (
                <CenterFlexBox sx={{ height: "200px" }}>
                  <Typography
                    component={"span"}
                    variant={"subtitle2"}
                    sx={{ color: grey[500] }}
                  >
                    원하는 영상을 클릭해주세요.
                  </Typography>
                </CenterFlexBox>
              )}
            </ChannelPaper>
          </Grid>
        )}
        <Grid item xs={12} sm={6.5} p={1}>
          <ChannelPaper>
            <InfoLabel>
              <Whatshot sx={{ mr: 0.5, verticalAlign: "middle" }} />이 채널의
              인급동들
            </InfoLabel>
            <ChannelVideoList channelId={channelId} />
          </ChannelPaper>
        </Grid>
      </Grid>
    </CurVideoForChartContext.Provider>
  );
};

export default VideosWithChartBlock;
