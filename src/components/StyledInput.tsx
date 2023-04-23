import React, { Ref } from "react";
import { InputBaseComponentProps } from "@mui/material";

import { DefaultSearchIcon, InputFormPaper, SearchInputBase } from "./styles";

const StyledInput = (props: {
  inputProps: InputBaseComponentProps;
  InputProps: Ref<any>;
  autoFocus?: boolean;
}) => {
  const { inputProps, InputProps, autoFocus } = props;

  return (
    <InputFormPaper component="form" ref={InputProps} elevation={0}>
      <SearchInputBase
        placeholder="채널 검색"
        inputProps={inputProps}
        autoFocus={autoFocus}
      />
      <DefaultSearchIcon />
    </InputFormPaper>
  );
};

export default StyledInput;
