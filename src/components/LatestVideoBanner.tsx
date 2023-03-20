import React, { useEffect, useRef, useState } from "react";
import { Typography } from "@mui/material";
import { PlayCircleOutline } from "@mui/icons-material";

import { LatestVideoBox } from "./styles";
import { ISimpleVideo } from "../utils/interfaces";
import VideoPlayerModal from "./VideoPlayerModal";

const LatestVideoBanner = (props: { latest_video: ISimpleVideo }) => {
  const { latest_video } = props;
  const [openVideoModal, setVideoModal] = useState(false);
  const [isMovingRight, setMovingRight] = useState(true);
  const TypoBoxRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const horizontalScroll = setInterval(() => {
      let typoXPos = TypoBoxRef.current.scrollLeft;
      let typoWidth =
        TypoBoxRef.current.scrollWidth - TypoBoxRef.current.clientWidth;
      if (typoXPos >= typoWidth) setMovingRight(false);
      else if (typoXPos === 0) setMovingRight(true);
      TypoBoxRef.current.scrollTo(typoXPos + (isMovingRight ? 1 : -1), 0);
    }, 30);
    window.addEventListener("load", () => horizontalScroll);
    return () => {
      window.removeEventListener("load", () => horizontalScroll);
      clearInterval(horizontalScroll);
    };
  }, [isMovingRight]);

  return (
    <>
      <LatestVideoBox ref={TypoBoxRef} onClick={() => setVideoModal(true)}>
        <Typography variant={"h6"}>
          <PlayCircleOutline
            sx={{
              verticalAlign: "middle",
            }}
          />
          {latest_video.title}
        </Typography>
      </LatestVideoBox>
      {/*<VideoPlayerModal*/}
      {/*  open={openVideoModal}*/}
      {/*  setOpen={setVideoModal}*/}
      {/*  videoId={latest_video.id}*/}
      {/*/>*/}
    </>
  );
};

export default LatestVideoBanner;
