import React, { forwardRef, Ref } from "react";
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
  Typography,
} from "@mui/material";
import ReactPlayer from "react-player";
import useSWR from "swr";
import dayjs from "dayjs";

import {
  ModalContainer,
  RecordsTypo,
  VideoModalFlexBox,
  VideoTitleTypo,
} from "./styles";
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
    const position: string =
      window.innerHeight > window.innerWidth ? "vertical" : "horizontal";
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
      <ModalContainer maxWidth={"lg"} ref={ref}>
        <Card sx={{ bgcolor: theme.palette.card.main }}>
          <VideoModalFlexBox className={position}>
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
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flex: 1 }}>
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
                    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                      <RecordsTypo component={"span"}>
                        {recordsTag(video.records)}
                      </RecordsTypo>
                      <ChannelChip
                        channelName={video.channel.name}
                        channelId={video.channel.id}
                      />
                    </Box>
                    {position === "vertical" ? (
                      <VideoTitleTypo className={position}>
                        {video.title}
                      </VideoTitleTypo>
                    ) : (
                      <Typography
                        sx={{ fontWeight: "500", lineHeight: "1.25rem" }}
                      >
                        {video.title}
                      </Typography>
                    )}
                  </Stack>
                )}
              </CardContent>
              <CardActions sx={{ justifyContent: "end" }}>
                <Button size="small" onClick={closeModal}>
                  닫기
                </Button>
              </CardActions>
            </Box>
          </VideoModalFlexBox>
        </Card>
      </ModalContainer>
    );
  }
);

export default VideoPlayerModal;
