import React, { memo, useContext } from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { grey } from "@mui/material/colors";

import { IVideoWithRecordAt } from "../utils/interfaces";
import VideoButtons from "./VideoButtons";
import { ChannelVideoThumbnail, VideoTitleTypo } from "./styles";
import { CurVideoForChartContext } from "./VideosWithChartBlock";
import { pastAwayJs } from "../utils/dayjs";
import VideoChart from "./VideoChart";

const ChannelVideoBoard = (props: { data: IVideoWithRecordAt }) => {
  const { currentVideo, setCurrentVideo } = useContext(CurVideoForChartContext);
  const { id, title, url, initial_record: record_at } = props.data;
  const tag = url.slice(url.length - 11, url.length);
  const theme = useTheme();
  const isMobileSize = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Stack spacing={1}>
      <Card
        sx={{
          bgcolor:
            currentVideo?.videoId === id
              ? theme.palette.card.dark
              : theme.palette.card.main,
        }}
        elevation={currentVideo?.videoId === id ? 0 : 2}
      >
        <Box display={"flex"}>
          <ChannelVideoThumbnail className={tag}>
            <VideoButtons video_id={id} url={url} size={"medium"} />
          </ChannelVideoThumbnail>
          <CardActionArea
            onClick={() =>
              setCurrentVideo(() => {
                if (id === currentVideo?.videoId) return null;
                return { videoTitle: title, videoId: id };
              })
            }
          >
            <CardContent>
              <Stack>
                <Typography sx={{ fontSize: "12px", color: grey[500] }}>
                  #{pastAwayJs(record_at)} 인급동 진입
                </Typography>
                <VideoTitleTypo>{title}</VideoTitleTypo>
              </Stack>
            </CardContent>
          </CardActionArea>
        </Box>
      </Card>
      {isMobileSize && currentVideo?.videoId === id && (
        <Paper>
          <VideoChart />
        </Paper>
      )}
    </Stack>
  );
};

export default memo(ChannelVideoBoard);
