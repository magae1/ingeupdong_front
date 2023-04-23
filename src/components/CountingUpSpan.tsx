import React, { useEffect, useRef, useState } from "react";

const CountingUpSpan = (props: { time: number; count: number; style?: {} }) => {
  const { time, count, style } = props;
  const [curCount, setCurrentCount] = useState(0);
  const timer = useRef<NodeJS.Timer>();

  useEffect(() => {
    const interval = time / count;
    const countingUp = () => {
      setCurrentCount((prevState) => prevState + 1);
    };
    timer.current = setInterval(countingUp, interval);
    return () => {
      clearInterval(timer.current);
    };
  }, [timer]);

  useEffect(() => {
    if (curCount === count) clearInterval(timer.current);
  }, [curCount, timer]);

  return <span style={style}>{curCount}</span>;
};
export default CountingUpSpan;
