import React from "react";
import { YouTube } from "@mui/icons-material";
import { Chip, useTheme } from "@mui/material";
import { grey, red } from "@mui/material/colors";
import { useNavigate } from "react-router";

const ChannelChip = (props: { channelName: string; channelId: number }) => {
  const { channelName, channelId } = props;

  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Chip
      icon={<YouTube style={{ color: red[600] }} />}
      label={channelName}
      sx={{
        width: "fit-content",
        borderRadius: theme.spacing(0.5),
        color: grey[theme.palette.mode === "light" ? 800 : 300],
      }}
      clickable
      onClick={() => navigate(`/channel/${channelId}`)}
      size={"small"}
    />
  );
};

export default ChannelChip;
