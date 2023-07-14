import React from "react";
import { animated, config, useSpring } from "@react-spring/web";

const CountingUpSpan = (props: { time: number; count: number; style?: {} }) => {
  const { time, count, style } = props;
  const { number } = useSpring({
    from: { number: 0 },
    number: count,
    delay: time,
    config: config.molasses,
  });

  return (
    <animated.span style={style}>
      {number.to((n) => n.toFixed(0))}
    </animated.span>
  );
};
export default CountingUpSpan;
