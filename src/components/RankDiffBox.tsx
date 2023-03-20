import { Box, Stack, useTheme } from "@mui/material";
import { useMemo } from "react";
import { RankDiff, RankState } from "./styles";
import { MovingSharp } from "@mui/icons-material";

interface Props {
  prevRank: number | undefined;
  curRank: number;
}

const RankDiffBox = ({ prevRank, curRank }: Props) => {
  const theme = useTheme();

  const DiffContent = useMemo(() => {
    if (!prevRank) return <span>NEW</span>;
    let diff = prevRank - curRank;
    if (diff === 0) return <span>-</span>;
    return (
      <>
        <MovingSharp
          sx={{
            verticalAlign: diff < 0 ? "top" : "bottom",
            rotate: diff < 0 ? "80deg" : undefined,
            fontSize: theme.spacing(1.7),
          }}
        />
        {Math.abs(diff)}
      </>
    );
  }, [theme, prevRank, curRank]);

  return (
    <Box width={1} height={1} alignItems={"center"} display={"flex"}>
      <Stack width={1} justifyContent={"center"}>
        <RankState>#{curRank}</RankState>
        <RankDiff>{DiffContent}</RankDiff>
      </Stack>
    </Box>
  );
};

export default RankDiffBox;
