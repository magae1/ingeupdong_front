import React, { useContext } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

import { IVideoWithRecordAt } from "../utils/interfaces";
import VideoButtons from "./VideoButtons";
import { ChannelVideoThumbnail } from "./styles";
import { CurVideoForChartContext } from "./VideosWithChart";
import { pastAwayJs } from "../utils/dayjs";

const ChannelVideoBoard = (props: { data: IVideoWithRecordAt }) => {
  const { setCurrentVideo } = useContext(CurVideoForChartContext);
  const { id, title, url, record_at } = props.data;
  const tag = url.slice(url.length - 11, url.length);

  return (
    <Card elevation={0}>
      <CardActionArea
        onClick={() => setCurrentVideo({ videoTitle: title, videoId: id })}
      >
        <CardContent>
          <Stack>
            <Typography sx={{ fontSize: "12px", color: "grey" }}>
              #{pastAwayJs(record_at)} 인급동 진입
            </Typography>
            <Typography
              component={"span"}
              style={{
                display: "inline-block",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                width: "inherit",
              }}
            >
              {title}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
      <ChannelVideoThumbnail className={tag}>
        <VideoButtons video_id={id} url={url} size={"medium"} />
      </ChannelVideoThumbnail>
    </Card>
  );
};

export default ChannelVideoBoard;
