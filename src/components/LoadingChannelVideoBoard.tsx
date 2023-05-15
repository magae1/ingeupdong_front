import React, { memo } from "react";
import {
  Box,
  Card,
  CardContent,
  Skeleton,
  Stack,
  useTheme,
} from "@mui/material";

const LoadingChannelVideoBoard = () => {
  const theme = useTheme();

  return (
    <Card sx={{ bgcolor: theme.palette.card.main }} elevation={2}>
      <Box display={"flex"}>
        <Skeleton
          variant={"rectangular"}
          height={90}
          sx={{ aspectRatio: "16 / 9" }}
        />
        <CardContent sx={{ width: "100%" }}>
          <Stack>
            <Skeleton variant={"text"} />
            <Skeleton variant={"text"} />
          </Stack>
        </CardContent>
      </Box>
    </Card>
  );
};

export default memo(LoadingChannelVideoBoard);
