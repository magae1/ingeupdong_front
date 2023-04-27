import React from "react";
import { Stack, Link, Typography, useTheme } from "@mui/material";
import { LaunchOutlined } from "@mui/icons-material";
import { useLoaderData } from "react-router";

import { ChannelInfos, RankDiff } from "./styles";
import CountingUpSpan from "./CountingUpSpan";
import { IChannelWithLatestVideo } from "../utils/interfaces";

const ChannelDescriptions = (props: { totalCount: number }) => {
  const { name: channelName, handle: channelHandle } =
    useLoaderData() as IChannelWithLatestVideo;
  const { totalCount } = props;
  const theme = useTheme();

  return (
    <Stack py={3} px={1.5}>
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
          time={1000}
          count={totalCount}
          style={{ fontSize: theme.spacing(4) }}
        />
        개의 인급동이 있어요.
      </Typography>
    </Stack>
  );
};

export default ChannelDescriptions;
