import React from "react";
import { red } from "@mui/material/colors";
import { YouTube } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { ChannelLinkSpan } from "./styles";

const ChannelChip = (props: { channelName: string; channelId: number }) => {
  const { channelName, channelId } = props;

  return (
    <Link to={`/channel/${channelId}`} style={{ width: "fit-content" }}>
      <ChannelLinkSpan>
        <YouTube style={{ color: red[600] }} />
        {channelName}
      </ChannelLinkSpan>
    </Link>
  );
};

export default ChannelChip;
