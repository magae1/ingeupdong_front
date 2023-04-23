import React from "react";
import { Stack, Link, Typography, useTheme } from "@mui/material";
import { LaunchOutlined } from "@mui/icons-material";

import { ChannelInfos, RankDiff } from "./styles";
import CountingUpSpan from "./CountingUpSpan";

const HelloChannelVideos = (props: {
  channelName: string;
  channelHandle: string;
}) => {
  const { channelName, channelHandle } = props;
  const theme = useTheme();
  return (
    <Stack direction={"column"} py={5} px={2}>
      <ChannelInfos>
        <Typography
          sx={{
            width: "fit-content",
          }}
        >
          {"Ch. "}
          <Link
            href={`https://www.youtube.com/${channelHandle}`}
            target={"_blank"}
            fontSize={theme.spacing(3)}
          >
            {channelName}
            <LaunchOutlined
              sx={{ verticalAlign: "middle", fontSize: "inherit" }}
            />
          </Link>
        </Typography>
        {channelHandle[0] === "@" && <RankDiff>{channelHandle}</RankDiff>}
      </ChannelInfos>
      <Typography align={"right"}>
        {"총 "}
        <CountingUpSpan
          time={1500}
          count={2}
          style={{ fontSize: theme.spacing(4) }}
        />
        개의 인급동이 있어요.
      </Typography>
    </Stack>
  );
};

export default HelloChannelVideos;
