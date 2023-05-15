import React from "react";
import { Button } from "@mui/material";

import { ErrorFlexBox, ErrorTypo } from "./styles";

const ErrorRetry = (props: { onClickRetry: () => void }) => {
  const { onClickRetry } = props;
  return (
    <ErrorFlexBox>
      <ErrorTypo>❌알 수 없는 에러가 발생했습니다.❌</ErrorTypo>
      <Button onClick={onClickRetry}>재시도</Button>
    </ErrorFlexBox>
  );
};

export default ErrorRetry;
