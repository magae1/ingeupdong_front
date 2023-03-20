import React, { useCallback, useMemo } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import {
  createTheme,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material";
import { koKR as mainkoKR } from "@mui/material/locale";
import { koKR as datekoKR } from "@mui/x-date-pickers";

import getDesignTokens from "./utils/theme";
import useToggle from "./hooks/useToggle";
import Layout from "./routes/Layout";
import Error from "./routes/Error";
import Trendings from "./routes/Trendings";
import Channel from "./routes/Channel";

const rootElem: HTMLElement = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(rootElem);

export const ColorModeContext = React.createContext({
  toggleMode: () => {},
});

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "",
        loader: async () => {
          throw redirect("/latest/");
        },
      },
      {
        path: ":recordId",
        loader: async ({ params }) => {
          const res = await fetch(`/api/recording/${params.recordId}/`);
          if (res.status === 404) throw new Response(res.body, { status: 404 });
          return res.json();
        },
        element: <Trendings />,
        errorElement: <Error />,
      },
      {
        path: "channel/:channelId",
        loader: async ({ params }) => {
          const res = await fetch(`/api/channel/${params.channelId}/`);
          if (res.status === 404) throw new Response(res.body, { status: 404 });
          return res.json();
        },
        element: <Channel />,
      },
    ],
  },
]);

const setCookie = (cname: string, cvalue: string, exdays: number) => {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

const getCookie = (cname: string) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

const DARK_MODE = "darkMode";

const initDarkModeCookie = () => {
  let darkMode = getCookie(DARK_MODE);
  let isDarkMode = false;
  if (darkMode === "") {
    setCookie(DARK_MODE, isDarkMode ? "dark" : "light", 7);
    return isDarkMode;
  }
  isDarkMode = darkMode === "dark";
  setCookie(DARK_MODE, isDarkMode ? "dark" : "light", 7);
  return isDarkMode;
};

const App = () => {
  const [isDarkMode, toggleDarkMode] = useToggle(initDarkModeCookie());

  const changeDarkMode = useCallback(() => {
    setCookie(DARK_MODE, isDarkMode ? "light" : "dark", 7);
    toggleDarkMode();
    return;
  }, [isDarkMode]);

  const theme = useMemo(
    () =>
      responsiveFontSizes(
        createTheme(
          getDesignTokens(isDarkMode ? "dark" : "light"),
          datekoKR,
          mainkoKR
        )
      ),
    [isDarkMode]
  );

  return (
    <ColorModeContext.Provider value={{ toggleMode: changeDarkMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
