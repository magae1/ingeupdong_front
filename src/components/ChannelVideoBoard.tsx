import React, { memo, useContext, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  DialogContent,
  Fade,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { LaunchOutlined, PlayCircleOutline } from "@mui/icons-material";
import { animated, useSpring } from "@react-spring/web";

import { IVideoWithRecordAt } from "../utils/interfaces";
import { VideoTitleTypo, VideoCardButtonGroup } from "./styles";
import { CurVideoForChartContext } from "./VideosWithChartBlock";
import { pastAwayJs } from "../utils/dayjs";
import VideoChart from "./VideoChart";
import ModalBackGround from "./ModalBackGround";
import VideoPlayerModal from "./VideoPlayerModal";

const AnimatedCard = animated(Card);

const ChannelVideoBoard = (props: { data: IVideoWithRecordAt }) => {
  const { currentVideo, setCurrentVideo } = useContext(CurVideoForChartContext);
  const { id, title, url, initial_record: record_at } = props.data;
  const tag = url.slice(url.length - 11, url.length);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobileSize = useMediaQuery(theme.breakpoints.down("sm"));
  const isClicked = currentVideo?.videoId === id;
  const { height } = useSpring({
    from: { height: 90 },
    to: {
      height: 90 + (isClicked ? 36 : 0),
    },
    delay: 0,
    config: { duration: 130 },
  });

  return (
    <>
      <Stack spacing={1}>
        <AnimatedCard
          style={{
            height: height,
            backgroundColor: isClicked
              ? theme.palette.card.dark
              : theme.palette.card.main,
          }}
          elevation={currentVideo?.videoId === id ? 0 : 2}
        >
          <CardActionArea
            onClick={() =>
              setCurrentVideo(() => {
                if (id === currentVideo?.videoId) return null;
                return { videoTitle: title, videoId: id };
              })
            }
            sx={{
              ":hover": {
                backgroundColor: theme.palette.card.light,
              },
            }}
          >
            <Box display={"flex"} height={"90px"}>
              <CardMedia
                sx={{
                  aspectRatio: "16 / 9",
                  height: "100%",
                }}
                image={`https://img.youtube.com/vi/${tag}/0.jpg`}
              />
              <CardContent sx={{ paddingX: theme.spacing(0.8) }}>
                <Typography variant={"caption"} sx={{ color: grey[500] }}>
                  #{pastAwayJs(record_at)} 인급동 진입
                </Typography>
                <VideoTitleTypo>{title}</VideoTitleTypo>
              </CardContent>
            </Box>
          </CardActionArea>
          {isClicked && (
            <div>
              <VideoCardButtonGroup fullWidth>
                <Button onClick={() => setOpen(true)}>
                  <PlayCircleOutline />
                </Button>
                <Button href={url} target={"_blank"}>
                  <LaunchOutlined />
                </Button>
              </VideoCardButtonGroup>
            </div>
          )}
        </AnimatedCard>
        {isMobileSize && isClicked && (
          <Paper sx={{ background: theme.palette.divider }}>
            <VideoChart />
          </Paper>
        )}
      </Stack>
      <ModalBackGround open={open}>
        <Fade in={open}>
          <DialogContent>
            <VideoPlayerModal closeModal={() => setOpen(false)} videoId={id} />
          </DialogContent>
        </Fade>
      </ModalBackGround>
    </>
  );
};

export default memo(ChannelVideoBoard);
