import React, { memo, useContext } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

import { IVideoWithRecordAt } from "../utils/interfaces";
import VideoButtons from "./VideoButtons";
import { ChannelVideoThumbnail, VideoTitleTypo } from "./styles";
import { CurVideoForChartContext } from "./VideosWithChartBlock";
import { pastAwayJs } from "../utils/dayjs";

const ChannelVideoBoard = (props: { data: IVideoWithRecordAt }) => {
  const { setCurrentVideo } = useContext(CurVideoForChartContext);
  const { id, title, url, initial_record: record_at } = props.data;
  const tag = url.slice(url.length - 11, url.length);
  const theme = useTheme();

  return (
    <Card sx={{ bgcolor: theme.palette.card.main }}>
      <CardActionArea
        onClick={() => setCurrentVideo({ videoTitle: title, videoId: id })}
      >
        <CardContent>
          <Stack>
            <Typography sx={{ fontSize: "12px", color: "grey" }}>
              #{pastAwayJs(record_at)} 인급동 진입
            </Typography>
            <VideoTitleTypo>{title}</VideoTitleTypo>
          </Stack>
        </CardContent>
      </CardActionArea>
      <ChannelVideoThumbnail className={tag}>
        <VideoButtons video_id={id} url={url} size={"medium"} />
      </ChannelVideoThumbnail>
    </Card>
  );
};

export default memo(ChannelVideoBoard);
