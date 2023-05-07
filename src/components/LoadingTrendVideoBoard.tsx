import React, { memo } from "react";
import { Box, Grid, Skeleton, Stack, useTheme } from "@mui/material";
import { CoverBox } from "./styles";

const LoadingTrendVideoBoard = () => {
  const theme = useTheme();

  return (
    <Grid container width={1} sx={{ minHeight: "150px" }}>
      <Grid item xs={2} sm={1.5} md={1}>
        <Box width={1} height={1} alignItems={"center"} display={"flex"}>
          <Stack width={1} justifyContent={"center"}>
            <Skeleton height={"36px"} />
            <Skeleton height={"18px"} />
          </Stack>
        </Box>
      </Grid>
      <Grid item xs={10} sm={6} md={7} px={1}>
        <Stack my={2} spacing={0.5}>
          <Skeleton width={70} />
          <Skeleton width={300} />
          <Skeleton width={90} height={20} />
        </Stack>
      </Grid>
      <Grid item xs={12} sm={4.5} md={4}>
        <CoverBox>
          <Skeleton
            variant={"rectangular"}
            height={"100%"}
            width={"100%"}
            sx={{ borderRadius: theme.spacing(2) }}
          />
        </CoverBox>
      </Grid>
    </Grid>
  );
};

export default memo(LoadingTrendVideoBoard);
