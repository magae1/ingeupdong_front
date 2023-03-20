import React, { useState } from "react";
import { Fade, Stack } from "@mui/material";
import { LaunchOutlined, PlayCircleFilledTwoTone } from "@mui/icons-material";

import { CoverBox, IButton } from "./styles";
import VideoPlayerModal from "./VideoPlayerModal";
import { IVideo } from "../utils/interfaces";
import ModalBackGround from "./ModalBackGround";

const ThumbnailBox = (props: { video: IVideo }) => {
  const { video } = props;
  const [open, setOpen] = useState(false);
  const length = video.url.length;
  const tag = video.url.slice(length - 11, length);

  return (
    <CoverBox className={tag}>
      <Stack direction={"row-reverse"} alignItems={"center"} spacing={2}>
        <IButton
          component={"a"}
          href={video.url}
          target={"_blank"}
          size={"large"}
        >
          <LaunchOutlined fontSize={"inherit"} />
        </IButton>
        <IButton onClick={() => setOpen(true)} size={"large"}>
          <PlayCircleFilledTwoTone fontSize={"inherit"} />
        </IButton>
      </Stack>
      <ModalBackGround open={open}>
        <Fade in={open}>
          <VideoPlayerModal
            closeModal={() => setOpen(false)}
            videoId={video.id}
          />
        </Fade>
      </ModalBackGround>
    </CoverBox>
  );
};

export default ThumbnailBox;
