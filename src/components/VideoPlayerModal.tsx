import React, { forwardRef, Ref } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import ReactPlayer from "react-player";
import useSWR from "swr";

import { ModalContainer } from "./styles";
import ChannelChip from "./ChannelChip";
import { mainFetcher } from "../utils/fetchers";
import { IVideoWithRecords } from "../utils/interfaces";

interface Props {
  closeModal: () => void;
  videoId: number;
}

const VideoPlayerModal = forwardRef(
  ({ closeModal, videoId }: Props, ref: Ref<HTMLDivElement>) => {
    const {
      data: video,
      isLoading,
      isValidating,
    } = useSWR<IVideoWithRecords>(`/video/${videoId}`, mainFetcher, {
      revalidateIfStale: false,
      revalidateOnFocus: false,
    });

    return (
      <ModalContainer maxWidth={"md"} ref={ref}>
        <Card>
          {!video || isValidating || isLoading ? (
            <Skeleton
              style={{ aspectRatio: 16 / 9 }}
              animation="wave"
              variant="rectangular"
            />
          ) : (
            <CardMedia style={{ aspectRatio: 16 / 9 }}>
              <ReactPlayer
                url={video.url}
                width={"100%"}
                height={"100%"}
                config={{
                  youtube: { playerVars: { controls: 1 } },
                }}
              />
            </CardMedia>
          )}
          <CardContent>
            {!video || isValidating || isLoading ? (
              <Stack>
                <Skeleton />
                <Skeleton />
              </Stack>
            ) : (
              <>
                <ChannelChip
                  channelName={video.channel.name}
                  channelId={video.channel.id}
                />
                <Typography>{video.title}</Typography>
              </>
            )}
          </CardContent>
          <CardActions>
            <Button size="small" onClick={closeModal}>
              닫기
            </Button>
          </CardActions>
        </Card>
      </ModalContainer>
    );
  }
);

export default VideoPlayerModal;
