import { styled } from "@mui/material/styles";
import { AppBar } from "@mui/material";
import { NavLink } from "react-router-dom";

export const LayoutAppBar = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  position: "fixed",
  borderWidth: "0",
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
