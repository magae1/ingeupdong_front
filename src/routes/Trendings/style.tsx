import { AppBar, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { animated } from "@react-spring/web";

export const TrendAppBar = animated(
  styled(AppBar)(({ theme }) => ({
    position: "fixed",
    [theme.breakpoints.down("sm")]: {
      top: 56,
    },
    [theme.breakpoints.up("sm")]: {
      top: 64,
    },
    background:
      theme.palette.mode === "light"
        ? "rgba(238,238,238,0.8)"
        : "rgba(10,10,10,0.8)",
    boxShadow: "none",
  }))
);

export const H = styled("b")(({ theme }) => ({
  fontSize: theme.spacing(3.5),
  color: theme.palette.text.primary,
}));

export const DateTypo = styled(Typography)(({ theme }) => ({
  wordSpacing: theme.spacing(4),
  color: grey[600],
  width: "",
  display: "block",
  margin: "0",
  lineHeightStep: "unset",
}));

export const UpdateTime = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(0.5),
  textAlign: "end",
  color: grey[600],
  fontSize: "14px",
}));
