import React, { ReactElement } from "react";
import { Slide, useScrollTrigger } from "@mui/material";

interface Props {
  window?: () => Window;
  children: ReactElement;
}

// https://mui.com/material-ui/react-app-bar/#hide-app-bar
const HideOnScroll = ({ window, children }: Props) => {
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

export default HideOnScroll;
