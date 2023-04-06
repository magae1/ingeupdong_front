import React, { ReactElement } from "react";
import { Backdrop, Modal } from "@mui/material";

interface Props {
  children: ReactElement;
  open: boolean;
  closeModal?: () => void;
}
const ModalBackGround = ({ children, open, closeModal }: Props) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={closeModal}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      {children}
    </Modal>
  );
};

export default ModalBackGround;
