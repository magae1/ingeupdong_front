import React, { Dispatch, SetStateAction, useCallback } from "react";
import { Box, Fade, Stack } from "@mui/material";

import ModalBackGround from "./ModalBackGround";
import { SearchModal } from "./styles";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const SearchBarModal = ({ open, setOpen }: Props) => {
  const closeModal = useCallback(() => setOpen(false), []);
  return (
    <ModalBackGround open={open} closeModal={closeModal}>
      <Fade in={open}>
        <SearchModal>
          <Stack>
            <Box>123</Box>
            <Box>456</Box>
          </Stack>
        </SearchModal>
      </Fade>
    </ModalBackGround>
  );
};

export default SearchBarModal;
