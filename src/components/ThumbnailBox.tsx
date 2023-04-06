import React from "react";

import { CoverBox } from "./styles";
import { IVideo } from "../utils/interfaces";
import VideoButtons from "./VideoButtons";

const ThumbnailBox = (props: { video: IVideo }) => {
  const { video } = props;
  const length = video.url.length;
  const tag = video.url.slice(length - 11, length);

  return (
    <CoverBox className={tag}>
      <VideoButtons video_id={video.id} url={video.url} />
    </CoverBox>
  );
};

export default ThumbnailBox;
