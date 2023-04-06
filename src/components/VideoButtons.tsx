import React, { useState } from "react";
import { DialogContent, Fade, Stack } from "@mui/material";
import { LaunchOutlined, PlayCircleFilledTwoTone } from "@mui/icons-material";

import { IButton } from "./styles";
import ModalBackGround from "./ModalBackGround";
import VideoPlayerModal from "./VideoPlayerModal";

const VideoButtons = (props: {
  video_id: number;
  url: string;
  size?: "small" | "large" | "medium";
}) => {
  const { video_id, url, size } = props;

  const [open, setOpen] = useState(false);

  return (
    <>
      <Stack direction={"row-reverse"} alignItems={"center"} spacing={2}>
        <IButton
          component={"a"}
          href={url}
          target={"_blank"}
          size={size ?? "large"}
        >
          <LaunchOutlined fontSize={"inherit"} />
        </IButton>
        <IButton onClick={() => setOpen(true)} size={size ?? "large"}>
          <PlayCircleFilledTwoTone fontSize={"inherit"} />
        </IButton>
      </Stack>
      <ModalBackGround open={open}>
        <Fade in={open}>
          <DialogContent>
            <VideoPlayerModal
              closeModal={() => setOpen(false)}
              videoId={video_id}
            />
          </DialogContent>
        </Fade>
      </ModalBackGround>
    </>
  );
};

export default VideoButtons;
