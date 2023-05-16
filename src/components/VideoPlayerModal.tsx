import React, { forwardRef, memo, Ref } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Skeleton,
  Stack,
  Grid,
  Box,
  useTheme,
} from "@mui/material";
import ReactPlayer from "react-player";
import useSWR from "swr";
import dayjs from "dayjs";

import { ModalContainer, RecordsTypo, VideoTitleTypo } from "./styles";
import ChannelChip from "./ChannelChip";
import { mainFetcher } from "../utils/fetchers";
import { IVideoWithRecords } from "../utils/interfaces";

const recordsTag = (records: string[]) => {
  let recordsLength = records.length;
  let prevRecord = null;
  let curRecord = null;
  let result = "#";
  for (let i = 0; i < recordsLength; i++) {
    curRecord = records[i];
    let curDateObj = dayjs(curRecord);
    if (prevRecord) {
      let prevDateObj = dayjs(prevRecord);
      if (curDateObj.year() === prevDateObj.year()) {
        if (curDateObj.month() === prevDateObj.month())
          result += curDateObj.format("D[일]");
        else result += curDateObj.format("M[월] D[일]");
      }
    } else {
      result += curDateObj.format("YY' M[월] D[일]");
    }
    prevRecord = curRecord;
    if (i < recordsLength - 1) result += "|";
  }
  return result + " 인급동";
};

interface Props {
  closeModal: () => void;
  videoId: number;
}

const VideoPlayerModal = forwardRef(
  ({ closeModal, videoId }: Props, ref: Ref<HTMLDivElement>) => {
    const theme = useTheme();

    const {
      data: video,
      isLoading,
      isValidating,
    } = useSWR<IVideoWithRecords>(`/video/${videoId}`, mainFetcher, {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnMount: true,
      keepPreviousData: false,
    });

    return (
      <ModalContainer maxWidth={"md"} ref={ref}>
        <Card sx={{ bgcolor: theme.palette.card.main }}>
          <CardMedia style={{ aspectRatio: 16 / 9 }}>
            {!video || isValidating || isLoading ? (
              <Skeleton
                sx={{ height: "100%" }}
                animation="wave"
                variant="rectangular"
              />
            ) : (
              <ReactPlayer
                url={video.url}
                width={"100%"}
                height={"100%"}
                config={{
                  youtube: { playerVars: { controls: 1 } },
                }}
              />
            )}
          </CardMedia>
          <CardContent>
            {!video || isValidating || isLoading ? (
              <Grid container width={1} spacing={0.5}>
                <Grid item xs={5}>
                  <Skeleton height={25} variant="text" />
                </Grid>
                <Grid item xs={2}>
                  <Skeleton height={25} variant="text" />
                </Grid>
                <Grid item xs={12}>
                  <Skeleton height={25} variant="text" />
                </Grid>
              </Grid>
            ) : (
              <Stack spacing={0.5}>
                <Box>
                  <RecordsTypo component={"span"}>
                    {recordsTag(video.records)}
                  </RecordsTypo>
                  <ChannelChip
                    channelName={video.channel.name}
                    channelId={video.channel.id}
                  />
                </Box>
                <VideoTitleTypo>{video.title}</VideoTitleTypo>
              </Stack>
            )}
          </CardContent>
          <CardActions sx={{ justifyContent: "end" }}>
            <Button size="small" onClick={closeModal}>
              닫기
            </Button>
          </CardActions>
        </Card>
      </ModalContainer>
    );
  }
);

export default memo(VideoPlayerModal);
