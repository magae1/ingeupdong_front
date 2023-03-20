import React, { useCallback } from "react";
import { KeyboardDoubleArrowUpSharp } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { animated, useSpring } from "@react-spring/web";
import { animateScroll as scroll } from "react-scroll";

const AnimatedSvg = animated(KeyboardDoubleArrowUpSharp);
const ScrollToTopButton = () => {
  const props = useSpring({
    from: { y: 0 },
    to: [{ y: -5 }, { y: -2 }, { y: -5 }, { y: 0 }],
    loop: true,
    config: { tension: 180, friction: 12 },
  });
  const onClickToScrollTop = useCallback(() => {
    scroll.scrollToTop();
  }, []);
  return (
    <IconButton onClick={onClickToScrollTop}>
      <AnimatedSvg style={props} />
    </IconButton>
  );
};

export default ScrollToTopButton;
