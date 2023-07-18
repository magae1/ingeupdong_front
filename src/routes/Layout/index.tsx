import React, { useEffect, useMemo, useState } from "react";
import { Outlet } from "react-router";
import { ScrollRestoration, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  Toolbar,
  useTheme,
  Stack,
  Button,
} from "@mui/material";
import { Brightness7, Brightness4, Search } from "@mui/icons-material";
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
import SearchModal from "../../components/SearchModal";

const Layout = () => {
  const colorMode = React.useContext(ColorModeContext);
  const theme = useTheme();
  const location = useLocation();
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const ButtonStyle = useMemo(
    () => ({
      borderWidth: "1px",
      borderColor: "#7a0008",
      borderStyle: "solid",
      color: "inherit",
      borderRadius: "4px",
    }),
    []
  );

  useEffect(() => {
    return () => {
      setOpenSearchModal(false);
    };
  }, [location]);

  return (
    <>
      <LayoutAppBar>
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
            <IconButton onClick={colorMode.toggleMode} sx={ButtonStyle}>
              {theme.palette.mode === "dark" ? (
                <Brightness4 />
              ) : (
                <Brightness7 />
              )}
            </IconButton>
            <Button
              onClick={() => setOpenSearchModal(true)}
              startIcon={<Search />}
              sx={ButtonStyle}
            >
              채널 검색
            </Button>
          </Stack>
        </Toolbar>
      </LayoutAppBar>
      <Box width={1}>
        <Offset />
        <Outlet />
      </Box>
      <Footer />
      <ScrollRestoration getKey={(location, matches) => location.key} />
      <SearchModal open={openSearchModal} setOpen={setOpenSearchModal} />
    </>
  );
};

export default Layout;
