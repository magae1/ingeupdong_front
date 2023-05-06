import {
  Box,
  Card,
  Container,
  Divider,
  IconButton,
  IconButtonProps,
  InputBase,
  Paper,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { Search } from "@mui/icons-material";

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

export const CenterFlexDiv = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const CoverBox = styled(Box)(({ theme, className }) => ({
  display: "flex",
  justifyContent: "center",
  backgroundImage: `url(https://img.youtube.com/vi/${className}/0.jpg)`,
  backgroundRepeat: "no-repeat",
  backgroundPositionX: "center",
  backgroundPositionY: "center",
  backgroundSize: "cover",
  borderRadius: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    height: "200px",
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
  borderBottom: `1px solid ${grey[theme.palette.mode === "dark" ? 700 : 400]}`,
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
  backgroundColor: grey[theme.palette.mode === "dark" ? 900 : 300],
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

export const InputFormPaper = styled(Paper)(({ theme }) => ({
  paddingLeft: "10px",
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    width: "300px",
  },
  [theme.breakpoints.up("md")]: {
    width: "400px",
  },
  [theme.breakpoints.up("lg")]: {
    width: "500px",
  },
  borderRadius: "24px",
  background: "rgba(0,0,0,0)",
  color: "inherit",
  border: `1.2px solid rgba(255,255,255,0.3)`,
})) as typeof Paper;

export const DefaultSearchIcon = styled(({ ...props }: IconButtonProps) => (
  <IconButton {...props} type={"button"} aria-label={"검색"}>
    <Search />
  </IconButton>
))`
  padding: 8px;
  color: inherit;
`;

export const SearchInputBase = styled(InputBase)`
  flex: 1;
  color: inherit;
  margin-left: 8px;
  &:focus {
    background: rgba(255, 255, 255, 1);
  }
`;

export const RecordsTypo = styled(Typography)(({ theme }) => ({
  marginRight: theme.spacing(0.5),
  [theme.breakpoints.down("sm")]: {
    fontSize: "14px",
  },
})) as typeof Typography;

export const ChannelVideoThumbnail = styled(Box)(({ theme, className }) => ({
  display: "flex",
  justifyContent: "center",
  backgroundImage: `url(https://img.youtube.com/vi/${className}/0.jpg)`,
  backgroundRepeat: "no-repeat",
  backgroundPositionX: "center",
  backgroundPositionY: "center",
  backgroundSize: "cover",
  borderBottomRightRadius: theme.spacing(0.5),
  height: "70px",
  borderBottomLeftRadius: theme.spacing(0.5),
}));

export const ChartWrapper = styled(Box)(({ theme }) => ({
  width: "inherit",
  height: "100%",
  borderRadius: "15px",
  border: `1px solid ${grey[theme.palette.mode === "light" ? 300 : 800]}`,
  padding: "3px 1px 1px",
  margin: `0 ${theme.spacing(1)} `,
}));

export const ChannelInfos = styled(Box)`
  display: flex;
  width: fit-content;
  flex-direction: column;
  align-items: end;
  padding-bottom: 25px;
`;

export const TrendVideoDivider = styled(Divider)(({ theme }) => ({
  borderColor: grey[theme.palette.mode === "light" ? 300 : 900],
}));

export const TrendBoardTitleTypo = styled(Typography)`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  font-weight: 500;
`;
