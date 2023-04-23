import React, { useEffect } from "react";
import { useLoaderData } from "react-router";
import { Box, Container, Stack } from "@mui/material";
import { YouTube } from "@mui/icons-material";

import { IChannelWithLatestVideo } from "../../utils/interfaces";
import { ChannelNameTypo, ChannelContainer } from "./style";
import VideosWithChart from "../../components/VideosWithChart";

const Channel = () => {
  const { id, name, handle, latest_video } =
    useLoaderData() as IChannelWithLatestVideo;
  const length = latest_video.url.length;
  const tag = latest_video.url.slice(length - 11, length);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <>
      <ChannelContainer maxWidth={"md"} className={tag}>
        <ChannelNameTypo variant={"h3"}>
          <YouTube
            sx={{
              fontSize: "inherit",
              color: "rgb(255,0,0)",
              mr: 0.5,
              verticalAlign: "-6px",
            }}
          />
          {name}
        </ChannelNameTypo>
      </ChannelContainer>
      <Box sx={{ width: "100%" }} my={1}>
        <Container maxWidth={"md"}>
          <Stack spacing={3}>
            <VideosWithChart
              channelInfo={{ id: id, name: name, handle: handle }}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Channel;
