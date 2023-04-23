import React from "react";
import { Stack, Link, Typography, useTheme } from "@mui/material";
import { LaunchOutlined } from "@mui/icons-material";
import { SWRInfiniteResponse } from "swr/infinite";

import { ChannelInfos, RankDiff } from "./styles";
import CountingUpSpan from "./CountingUpSpan";
import { IChannelVideoWithPagination } from "../utils/interfaces";

const HelloChannelVideos = (props: {
  channelName: string;
  channelHandle: string;
  infiniteResponse: SWRInfiniteResponse<IChannelVideoWithPagination, any>;
}) => {
  const { channelName, channelHandle, infiniteResponse } = props;
  const { data, isLoading, error } = infiniteResponse;
  const theme = useTheme();
  console.log(data);
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
        {data && data[0] && !isLoading && !error && (
          <CountingUpSpan
            time={1000}
            count={data[0].count}
            style={{ fontSize: theme.spacing(4) }}
          />
        )}
        개의 인급동이 있어요.
      </Typography>
    </Stack>
  );
};

export default HelloChannelVideos;
