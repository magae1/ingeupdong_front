import { PaletteMode } from "@mui/material";
import { amber, deepOrange, grey } from "@mui/material/colors";

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // for light mode
          primary: {
            light: "#FF6767",
            main: "#FF0000",
            dark: "#980012",
            contrastText: "#fff",
          },
          secondary: {
            main: "#FE5F00",
          },
          divider: amber[200],
          background: {
            default: grey[200],
            paper: "#CEC3C1",
          },
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          // for dark mode
          primary: {
            light: "#FF6767",
            main: "#FF0000",
            dark: "#980012",
            contrastText: "#fff",
          },
          secondary: {
            main: "#FE5F00",
          },
          divider: deepOrange[700],
          background: {
            default: "#0a0a0a",
            paper: "#220901",
          },
          text: {
            primary: "#fff",
            secondary: grey[400],
          },
        }),
  },
});

export default getDesignTokens;
