import React, { useEffect, useRef, useState } from "react";
import { Typography } from "@mui/material";

const CountUpBox = (props: { total: number }) => {
  const { total } = props;
  const [count, setCount] = useState(0);
  const timer = useRef<NodeJS.Timer>();

  useEffect(() => {
    const interval = 1500 / total;
    const countingUp = () => {
      setCount((prevState) => prevState + 1);
    };
    timer.current = setInterval(countingUp, interval);
    return () => {
      clearInterval(timer.current);
    };
  }, [timer]);

  useEffect(() => {
    if (count === total) clearInterval(timer.current);
  }, [count, timer]);

  return (
    <Typography variant={"h3"} component={"span"}>
      {count}
    </Typography>
  );
};

export default CountUpBox;
