import React from "react";
import { red } from "@mui/material/colors";
import { YouTube } from "@mui/icons-material";
import { Chip, useTheme } from "@mui/material";

const ChannelChip = (props: { channelName: string; channelId: number }) => {
  const theme = useTheme();
  const { channelName, channelId } = props;
  return (
    <Chip
      sx={{
        height: theme.spacing(3),
        width: "fit-content",
        borderRadius: theme.spacing(1),
        "& .MuiChip-label": {
          color: theme.palette.text.secondary,
        },
      }}
      label={channelName}
      component={"a"}
      href={`/channel/${channelId}`}
      icon={<YouTube style={{ color: red[600] }} />}
      clickable
    />
  );
};

export default ChannelChip;
