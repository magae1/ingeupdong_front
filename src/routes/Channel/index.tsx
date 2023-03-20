import React, { useEffect } from "react";
import { useLoaderData } from "react-router";

import { IChannelWithLatestVideo } from "../../utils/interfaces";
import { ChannelNameTypo, ChannelContainer } from "./style";
import { Box, Container } from "@mui/material";
import LatestVideoBanner from "../../components/LatestVideoBanner";

const Channel = () => {
  const { id, name, handle, latest_video } =
    useLoaderData() as IChannelWithLatestVideo;
  const length = latest_video.url.length;
  const tag = latest_video.url.slice(length - 11, length);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [name, handle]);

  return (
    <>
      <ChannelContainer maxWidth={"md"} className={tag}>
        <LatestVideoBanner latest_video={latest_video} />
        <ChannelNameTypo variant={"h3"}>{name}</ChannelNameTypo>
      </ChannelContainer>
      <Box sx={{ width: "100%" }}>
        <Container maxWidth={"md"}>
          <ol>
            <li>{id}</li>
          </ol>
        </Container>
      </Box>
    </>
  );
};

export default Channel;
