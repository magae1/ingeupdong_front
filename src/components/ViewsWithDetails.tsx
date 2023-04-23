import React, { useState } from "react";
import { Typography } from "@mui/material";

import { numWithDot, shortenNum } from "../utils/formatters";
import { BootstrapTooltip, TypoViews, UnStyledButton } from "./styles";

interface Props {
  curViews: number;
  prevViews: number | undefined;
}

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
