import { styled } from "@mui/material/styles";
import { AppBar } from "@mui/material";
import { grey } from "@mui/material/colors";
import { NavLink } from "react-router-dom";

export const LayoutAppBar = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  position: "fixed",
  borderBottom: `1px solid ${grey[theme.palette.mode === "dark" ? 800 : 300]}`,
  disableGutters: true,
  backgroundColor: theme.palette.primary.dark,
}));

export const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export const TitleBottom = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TitleGrid = styled("div")`
  display: grid;
  width: fit-content;
`;

export const UnstyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;
`;
