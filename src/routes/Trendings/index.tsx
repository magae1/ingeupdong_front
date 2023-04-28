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
  const { recordDate } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const HighlightDateForm = useMemo(() => {
    const dayObj = dayjs(recordData.record_at);
    return (
      <DateTypo>
        <H>{dayObj.month() + 1}</H>월 <H>{dayObj.date()}</H>일
      </DateTypo>
    );
  }, [recordData]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [recordDate]);

  return (
    <Container maxWidth={"md"} sx={{ minHeight: "95vh" }}>
      <Offset />
      <TrendAppBar>
        <Container maxWidth={"md"}>
          <Toolbar>
            <Grid container width={1}>
              <Grid item xs={2}>
                <Button
                  fullWidth
                  onClick={() => {
                    navigate(`../${recordData.prev_record?.record_at}`);
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
                    navigate(`../${recordData.next_record?.record_at}`);
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
        {timeJs(recordData.record_at)}
      </UpdateTime>
      <TrendVideoList recordId={recordData.id.toString()} />
      <CalendarModal
        open={open}
        setOpen={setOpen}
        initDate={dayjs(recordData.record_at)}
      />
    </Container>
  );
};

export default Trendings;
