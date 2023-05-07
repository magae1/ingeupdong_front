import { PaletteMode } from "@mui/material";
import { grey } from "@mui/material/colors";
declare module "@mui/material/styles" {
  interface Palette {
    card: Palette["primary"];
  }
  interface PaletteOptions {
    card: PaletteOptions["primary"];
  }
}

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
          divider: grey[300],
          background: {
            default: grey[200],
            paper: "rgb(235,235,235)",
          },
          card: {
            main: "#CEC3C1",
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
          divider: grey[900],
          background: {
            default: "#0a0a0a",
            paper: "rgb(12,12,12)",
          },
          card: {
            main: "#220901",
          },
          text: {
            primary: "#fff",
            secondary: grey[400],
          },
        }),
  },
});

export default getDesignTokens;
