import React, { useState } from "react";
import { Typography } from "@mui/material";
import _ from "underscore";

import { BootstrapTooltip, TypoViews, UnStyledButton } from "./styles";

interface Props {
  curViews: number;
  prevViews: number | undefined;
}

const numWithDot = (num: number) => {
  let arr = num.toString().split("");
  let result = new Array<string>();
  let index = 1;
  while (true) {
    result.push(arr.pop() ?? "");
    if (_.isEmpty(arr)) break;
    if (index % 3 === 0) result.push(",");
    index++;
  }
  return result.reverse().join("");
};

const shortenNum = (num: number): string => {
  let exp = 0;
  let set = [
    {
      tail: "억",
      offset: Math.pow(10, 8),
    },
    {
      tail: "만",
      offset: Math.pow(10, 4),
    },
    {
      tail: "천",
      offset: Math.pow(10, 3),
    },
    {
      tail: "백",
      offset: Math.pow(10, 2),
    },
    {
      tail: "",
      offset: Math.pow(10, 0),
    },
  ];
  while (true) {
    let tmp = Math.floor(num / set[exp].offset);
    if (exp > set.length || tmp > 0) {
      num = tmp;
      break;
    }
    exp += 1;
  }
  return numWithDot(num) + set[exp].tail;
};

const ViewsWithDetails = ({ prevViews, curViews }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <Typography sx={{ textAlign: "start", fontSize: "0.8em" }}>
      조회수:
      <BootstrapTooltip
        title={
          `${numWithDot(curViews)}회` +
          (prevViews ? `(+${numWithDot(curViews - prevViews)}회)` : "")
        }
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <UnStyledButton onClick={() => setOpen((prevState) => !prevState)}>
          <TypoViews component={"span"}>
            {shortenNum(curViews)}회
            {prevViews && `(+${shortenNum(curViews - prevViews)}회)`}
          </TypoViews>
        </UnStyledButton>
      </BootstrapTooltip>
    </Typography>
  );
};

export default ViewsWithDetails;
