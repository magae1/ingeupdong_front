import React, { Dispatch, SetStateAction } from "react";
import { Dayjs } from "dayjs";
import { Fade } from "@mui/material";

import { ModalBox } from "./styles";
import RecordCalendar from "./RecordCalendar";
import ModalBackGround from "./ModalBackGround";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  initDate: Dayjs;
}

export const CalendarModalControl = React.createContext({
  closeModal: () => {},
});

const CalendarModal = ({ open, setOpen, initDate }: Props) => {
  const closeModal = () => setOpen(false);
  return (
    <CalendarModalControl.Provider value={{ closeModal: closeModal }}>
      <ModalBackGround open={open} closeModal={closeModal}>
        <Fade in={open}>
          <ModalBox>
            <RecordCalendar initDate={initDate} />
          </ModalBox>
        </Fade>
      </ModalBackGround>
    </CalendarModalControl.Provider>
  );
};

export default CalendarModal;
