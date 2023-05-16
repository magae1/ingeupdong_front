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
            contrastText: "#000",
          },
          divider: grey[300],
          background: {
            default: grey[200],
            paper: "rgb(235,235,235)",
          },
          card: {
            light: "#fbe3db",
            main: "#f1d9d1",
            dark: "#e2cac2",
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
            contrastText: "#fff",
          },
          divider: grey[900],
          background: {
            default: "#0a0a0a",
            paper: "rgb(12,12,12)",
          },
          card: {
            light: "rgb(73,28,28)",
            main: "rgb(63,18,18)",
            dark: "rgb(53,8,8)",
          },
          text: {
            primary: "#fff",
            secondary: grey[400],
          },
        }),
  },
});

export default getDesignTokens;
