import React, { Dispatch, SetStateAction, useCallback } from "react";
import { Box, Fade } from "@mui/material";

import ModalBackGround from "./ModalBackGround";
import SearchBar from "./SearchBar";

const style = {
  position: "absolute" as "absolute",
  top: "28px",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  bgcolor: "background.default",
  boxShadow: 24,
  py: "7px",
  px: 2,
};

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const SearchBarModal = ({ open, setOpen }: Props) => {
  const closeModal = useCallback(() => setOpen(false), []);
  return (
    <ModalBackGround open={open} closeModal={closeModal}>
      <Fade in={open}>
        <Box sx={style}>
          <SearchBar closeModal={closeModal} autoFocus={true} />
        </Box>
      </Fade>
    </ModalBackGround>
  );
};

export default SearchBarModal;
