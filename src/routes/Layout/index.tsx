import React, { useState } from "react";
import { Outlet } from "react-router";
import {
  Box,
  Typography,
  IconButton,
  Toolbar,
  useTheme,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { Brightness7, Brightness4 } from "@mui/icons-material";
import _ from "underscore";

import { ColorModeContext } from "../../index";
import {
  LayoutAppBar,
  Offset,
  TitleBottom,
  TitleGrid,
  UnstyledNavLink,
} from "./style";
import Footer from "../../components/Footer";
import SearchBar from "../../components/SearchBar";
import { DefaultSearchIcon } from "../../components/styles";
import SearchBarModal from "../../components/SearchBarModal";

const Layout = () => {
  const colorMode = React.useContext(ColorModeContext);
  const theme = useTheme();
  const isMobileSize = useMediaQuery(theme.breakpoints.down("sm"));
  const [openSearchBar, setOpenSearchBar] = useState(false);

  return (
    <>
      <LayoutAppBar color={"primary"}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <UnstyledNavLink to={"/"}>
            <TitleGrid>
              <Typography variant="h5" sx={{ textAlign: "center" }}>
                인·급·동
              </Typography>
              <TitleBottom>
                {"히스토리".split("").map((value) => (
                  <Typography
                    sx={{ fontSize: theme.spacing(0.5) }}
                    key={_.uniqueId("AppSubtitle")}
                    component={"span"}
                  >
                    {value}
                  </Typography>
                ))}
              </TitleBottom>
            </TitleGrid>
          </UnstyledNavLink>
          <Stack direction={"row-reverse"} spacing={1}>
            <IconButton onClick={colorMode.toggleMode} color="inherit">
              {theme.palette.mode === "dark" ? (
                <Brightness4 />
              ) : (
                <Brightness7 />
              )}
            </IconButton>
            {isMobileSize ? (
              <DefaultSearchIcon onClick={() => setOpenSearchBar(true)} />
            ) : (
              <SearchBar />
            )}
          </Stack>
        </Toolbar>
      </LayoutAppBar>
      <Box width={1} minHeight={"100vh"}>
        <Offset />
        <Outlet />
      </Box>
      <Footer />
      <SearchBarModal open={openSearchBar} setOpen={setOpenSearchBar} />
    </>
  );
};

export default Layout;
