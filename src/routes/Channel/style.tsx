import { Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const ChannelContainer = styled(Container)(({ className, theme }) => ({
  backgroundImage: `url(https://img.youtube.com/vi/${className}/0.jpg)`,
  backgroundAttachment: "fixed",
  backgroundRepeat: "no-repeat",
  backgroundPositionY: "top",
  backgroundPositionX: "center",
  backgroundSize: "100% auto",
  display: "flex",
  paddingTop: "5%",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "100%",
  aspectRatio: "17.3 / 10",
  [theme.breakpoints.up("md")]: {
    backgroundSize: "900px auto",
  },
}));

export const ChannelNameTypo = styled(Typography)`
  color: rgb(255, 255, 255);
  background: rgba(0, 0, 0, 0.5);
  width: fit-content;
`;
