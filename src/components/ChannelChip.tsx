import React from "react";
import { red } from "@mui/material/colors";
import { YouTube } from "@mui/icons-material";

import { ChannelLinkSpan, LinkEllipsis } from "./styles";

const ChannelChip = (props: { channelName: string; channelId: number }) => {
  const { channelName, channelId } = props;

  return (
    <ChannelLinkSpan>
      <YouTube style={{ color: red[600] }} />
      <LinkEllipsis to={`/channel/${channelId}`}>{channelName}</LinkEllipsis>
    </ChannelLinkSpan>
  );
};

export default ChannelChip;
