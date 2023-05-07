import React, { memo } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Skeleton,
  Stack,
  useTheme,
} from "@mui/material";

const LoadingChannelVideoBoard = () => {
  const theme = useTheme();

  return (
    <Card sx={{ bgcolor: theme.palette.card.main }} elevation={2}>
      <CardActionArea>
        <CardContent sx={{ minHeight: "90px" }}>
          <Stack>
            <Skeleton />
            <Skeleton />
          </Stack>
        </CardContent>
      </CardActionArea>
      <Skeleton variant={"rectangular"} height={70} />
    </Card>
  );
};

export default memo(LoadingChannelVideoBoard);
