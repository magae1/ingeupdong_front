import React, { Dispatch, SetStateAction, useCallback } from "react";
import {
  Box,
  Fade,
  IconButton,
  Modal,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Close } from "@mui/icons-material";

import SearchingPlace from "./SearchingPlace";
import { SearchModalWrapper } from "./styles";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const SearchModal = ({ open, setOpen }: Props) => {
  const theme = useTheme();
  const isMobileSize = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Modal open={open} disableRestoreFocus>
      <Fade in={open}>
        <SearchModalWrapper>
          <Box
            sx={{
              position: "fixed",
              top: "-15px",
              left: isMobileSize ? "calc(100% - 40px)" : "575px",
              borderRadius: "20px",
              backgroundColor: theme.palette.divider,
              zIndex: "900",
            }}
          >
            <IconButton onClick={() => setOpen(false)}>
              <Close />
            </IconButton>
          </Box>
          <SearchingPlace />
        </SearchModalWrapper>
      </Fade>
    </Modal>
  );
};

export default SearchModal;
