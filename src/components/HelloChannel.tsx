import React from "react";
import { Box, Link, Typography } from "@mui/material";

import CountUpBox from "./CountUpBox";
import { FlexBox, RankDiff, RankState } from "./styles";
import { OpenInNew } from "@mui/icons-material";

interface Props {
  channelName: string;
  channelHandle: string;
}

const YOUTUBE_URL = "https://www.youtube.com/";

const HelloChannel = ({ channelName, channelHandle }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "end",
        alignItems: "end",
      }}
    >
      <div style={{ marginRight: "1px" }}>
        <Link href={YOUTUBE_URL + channelHandle} target={"_blank"}>
          {channelName}
          <OpenInNew fontSize={"inherit"} />
        </Link>
        <RankDiff component={"span"}>{channelHandle}</RankDiff>
        은(는)
      </div>
      <div>
        {" "}
        <CountUpBox total={5} />
        개의 인급동이 있어요.
      </div>
    </Box>
  );
};

export default HelloChannel;
