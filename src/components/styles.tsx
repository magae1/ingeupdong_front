import {
  Box,
  ButtonGroup,
  Card,
  Container,
  IconButton,
  IconButtonProps,
  InputBase,
  Paper,
  PaperProps,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { Search } from "@mui/icons-material";

export const ChannelLinkSpan = styled(Box)(({ theme }) => {
  let strong = theme.palette.mode === "light" ? 100 : 170;
  return {
    display: "inline-flex",
    width: "fit-content",
    borderRadius: theme.spacing(0.5),
    backgroundColor: `rgba(${strong}, ${strong}, ${strong}, 0.2)`,
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(0.5),
    height: theme.spacing(3),
    alignItems: "center",
    gap: theme.spacing(0.5),
    color: theme.palette.text.secondary,
    textDecoration: "none",
    fontSize: "0.8rem",
    "&:hover": {
      backgroundColor: `rgba(${strong}, ${strong}, ${strong}, 0.6)`,
    },
  };
});

export const SearchModal = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "30vh",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "600px",
  height: "400px",
  borderRadius: theme.spacing(0.5),
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.down("sm")]: {
    height: `calc(100vh - ${theme.spacing(10)})`,
    width: "100%",
    top: `calc(50vh - ${theme.spacing(5)})`,
  },
})) as typeof Box;

export const RankState = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  fontSize: theme.spacing(3),
})) as typeof Typography;

export const RankDiff = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  fontSize: theme.spacing(1.5),
  color: grey[600],
})) as typeof Typography;

export const BootstrapTooltip = styled(
  ({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  )
)(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color:
      theme.palette.mode === "dark"
        ? theme.palette.common.white
        : theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.common.white
        : theme.palette.common.black,
    color:
      theme.palette.mode === "dark"
        ? theme.palette.common.black
        : theme.palette.common.white,
  },
  enterTouchDelay: 30,
}));

export const TypoViews = styled(Typography)`
  font-size: inherit;
  cursor: default;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
` as typeof Typography;

export const UnStyledButton = styled("button")`
  background-color: rgba(0, 0, 0, 0);
  border: none;
  color: inherit;
`;

export const ModalContainer = styled(Container)`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0);
`;

export const SpinnerBox = styled(Box)(() => ({
  display: "flex",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
}));

export const ErrorTypo = styled(Typography)(() => ({
  textAlign: "center",
}));

export const CenterFlexBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const CoverBox = styled(Box)(({ theme, className }) => ({
  display: "flex",
  justifyContent: "center",
  backgroundImage:
    className && `url(https://img.youtube.com/vi/${className}/0.jpg)`,
  backgroundRepeat: "no-repeat",
  backgroundPositionX: "center",
  backgroundPositionY: "center",
  backgroundSize: "cover",
  borderRadius: theme.spacing(2),
  aspectRatio: "16 / 9",
  [theme.breakpoints.down("sm")]: {
    weight: "100%",
  },
  [theme.breakpoints.up("sm")]: {
    height: "100%",
  },
}));

export const IButton = styled(IconButton)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    size: "large",
  },
  color: "rgba(255,255,255,0.9)",
})) as typeof IconButton;

export const InfoLabel = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  marginBottom: 6,
  paddingY: 3,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const InfoCard = styled(Card)(() => ({
  elevation: 0,
  boxShadow: "none",
  background: "rgba(255,255,255,0)",
  height: "100%",
}));

export const FlexBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(0.5),
  marginLeft: theme.spacing(1),
}));

export const BottomBox = styled("footer")(({ theme }) => ({
  width: "100%",
  backgroundColor: theme.palette.mode === "light" ? "#e6e6e6" : "#1e1e1e",
}));

export const ModalBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: theme.palette.background.default,
  border: `2px solid ${theme.palette.mode === "light" ? "#000" : "#FFF"}`,
  boxShadow: "24px",
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2),
}));

export const DefaultSearchIcon = styled(({ ...props }: IconButtonProps) => (
  <IconButton {...props} type={"button"} aria-label={"검색"}>
    <Search />
  </IconButton>
))`
  padding: 8px;
  color: inherit;
`;

export const RecordsTypo = styled(Typography)(({ theme }) => ({
  marginRight: theme.spacing(0.5),
  [theme.breakpoints.down("sm")]: {
    fontSize: "14px",
  },
})) as typeof Typography;

export const ChartWrapper = styled(Box)({
  width: "inherit",
  height: "100%",
  borderRadius: "15px",
  padding: "1.5px 0px",
});

export const ChannelInfos = styled(Box)`
  display: flex;
  width: fit-content;
  flex-direction: column;
  align-items: end;
  padding-bottom: 25px;
`;

export const VideoTitleTypo = styled(Typography)`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  font-weight: 500;
  line-height: 1.25rem;
`;

export const ChannelPaper = styled(({ ...props }: PaperProps) => (
  <Paper {...props} elevation={0}></Paper>
))(({ theme }) => ({
  width: "100%",
  height: "100%",
  padding: `${theme.spacing(0.5)} ${theme.spacing(1.5)}`,
  border: `0.5px solid ${theme.palette.divider}`,
}));

export const ChannelVideoPageButtonsBox = styled(Box)`
  display: grid;
  width: 100%;
  grid-template-columns: 64px 1fr 64px;
  margin-top: auto;
`;

export const ErrorFlexBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  width: "100%",
  minHeight: "200px",
  gap: theme.spacing(1.2),
}));

export const VideoCardButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  borderBottom: "none",
  borderTop: `1px solid ${grey[theme.palette.mode === "light" ? 400 : 900]}`,
  boxShadow: "none",
  ".MuiButtonGroup-grouped": {
    borderTopLeftRadius: "0px",
    borderTopRightRadius: "0px",
    border: "none",
    backgroundColor: theme.palette.card.dark,
    color: grey[600],
    "&:hover, &.Mui-focusVisible": {
      border: "none",
      backgroundColor: theme.palette.card.light,
      color: theme.palette.secondary.contrastText,
    },
  },
}));

export const VideoModalFlexBox = styled(Box)(({ theme, className }) => {
  if (className === "horizontal") {
    return {
      display: "grid",
      gridTemplateColumns: "3fr 1fr",
    };
  }
  return {};
});
