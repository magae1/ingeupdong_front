import React from "react";
import { Grid, Stack, Typography } from "@mui/material";

import { TrendVideoWrapper } from "./styles";
import { IVideoWithRecordAt } from "../utils/interfaces";
import VideoButtons from "./VideoButtons";
import dayjs from "dayjs";

const ChannelVideoBoard = (props: { data: IVideoWithRecordAt }) => {
  const { id, title, url, record_at } = props.data;
  const tag = url.slice(url.length - 11, url.length);

  return (
    <TrendVideoWrapper>
      <Grid container>
        <Grid item xs={12} sm={6} md={7} lg={8}>
          <Stack sx={{ width: "100%" }} px={1} py={2}>
            <Typography sx={{ fontSize: "12px", color: "grey" }}>
              #{dayjs(record_at).locale("ko").format("YY' MMM DD[일]")} 인급동
              진입
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
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={5}
          lg={4}
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundImage: `url(https://img.youtube.com/vi/${tag}/0.jpg)`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPositionX: "center",
            backgroundPositionY: "center",
            minHeight: "60px",
          }}
        >
          <VideoButtons video_id={id} url={url} size={"medium"} />
        </Grid>
      </Grid>
    </TrendVideoWrapper>
  );
};

export default ChannelVideoBoard;
