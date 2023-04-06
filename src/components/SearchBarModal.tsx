import React, { Dispatch, SetStateAction, useCallback } from "react";
import { Card, Fade } from "@mui/material";

import ModalBackGround from "./ModalBackGround";
import SearchBar from "./SearchBar";
import { ModalContainer } from "./styles";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const SearchBarModal = ({ open, setOpen }: Props) => {
  const closeModal = useCallback(() => setOpen(false), []);
  return (
    <ModalBackGround open={open} closeModal={closeModal}>
      <Fade in={open}>
        <ModalContainer sx={{ top: "30%" }}>
          <Card sx={{ borderRadius: "24px" }}>
            <SearchBar closeModal={closeModal} />
          </Card>
        </ModalContainer>
      </Fade>
    </ModalBackGround>
  );
};

export default SearchBarModal;
