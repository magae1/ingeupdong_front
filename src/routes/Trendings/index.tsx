import React, { useEffect, useMemo } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router";
import _ from "underscore";
import { Button, Container, Grid, Toolbar } from "@mui/material";
import {
  ArrowBackIosNew,
  ArrowForwardIos,
  UpdateSharp,
} from "@mui/icons-material";
import dayjs from "dayjs";

import { IPrevAndNextRecording } from "../../utils/interfaces";
import { TrendAppBar, DateTypo, H, UpdateTime } from "./style";
import { Offset } from "../Layout/style";
import { timeJs } from "../../utils/dayjs";
import TrendVideoList from "../../components/TrendVideoList";
import CalendarModal from "../../components/CalendarModal";

const Trendings = () => {
  const recordData = useLoaderData() as IPrevAndNextRecording;
  const { recordId } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const HighlightDateForm = useMemo(() => {
    const dayObj = dayjs(recordData.date);
    return (
      <DateTypo>
        <H>{dayObj.month() + 1}</H>월 <H>{dayObj.date()}</H>일
      </DateTypo>
    );
  }, [recordData]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [recordId]);

  return (
    <Container maxWidth={"md"} sx={{ minHeight: "calc(100vh - 50px)" }}>
      <Offset />
      <TrendAppBar>
        <Container maxWidth={"md"}>
          <Toolbar>
            <Grid container width={1}>
              <Grid item xs={2}>
                <Button
                  fullWidth
                  onClick={() => {
                    navigate(`../${recordData.prev_record?.id}`);
                  }}
                  disabled={_.isEmpty(recordData.prev_record)}
                  sx={{ height: "100%" }}
                >
                  <ArrowBackIosNew />
                </Button>
              </Grid>
              <Grid item xs={8}>
                <Button fullWidth onClick={() => setOpen(true)}>
                  {HighlightDateForm}
                </Button>
              </Grid>
              <Grid item xs={2}>
                <Button
                  fullWidth
                  onClick={() => {
                    navigate(`../${recordData.next_record?.id}`);
                  }}
                  disabled={_.isEmpty(recordData.next_record)}
                  sx={{ height: "100%" }}
                >
                  <ArrowForwardIos />
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </Container>
      </TrendAppBar>
      <UpdateTime>
        <UpdateSharp
          sx={{ mr: 0.5, verticalAlign: "top" }}
          fontSize={"small"}
        />
        {timeJs(recordData.time.slice(0, 5))}
      </UpdateTime>
      <TrendVideoList recordId={recordId as string} />
      <CalendarModal
        open={open}
        setOpen={setOpen}
        initDate={dayjs(recordData.date)}
      />
    </Container>
  );
};

export default Trendings;
