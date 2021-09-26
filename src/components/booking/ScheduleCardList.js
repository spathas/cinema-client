import React, { useState } from "react";
import { Container, Grid } from "@material-ui/core";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

import ScheduleCard from "./ScheduleCard";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  centeredText: {
    textAlign: "center",
  },
});

export default function CardList(props) {
  const [pointer, setPointer] = useState(0);
  const [slideDirection, setSlideDirection] = useState("left");
  const [clickedSchedule, setClickedSchedule] = useState();

  const schedules = props.schedules;
  const results = props.results;

  const classes = useStyles();

  const selectHandler = (id) => {
    setClickedSchedule(id);
  };

  const cardItemsHandler = () => {
    let selectedSchedules = [];

    if (results > 3) {
      selectedSchedules = schedules.slice(pointer, 3 + pointer);
    } else {
      selectedSchedules = schedules;
    }

    return selectedSchedules.map((schedule) => {
      let clicked = false;
      if (schedule.id === clickedSchedule) {
        clicked = true;
      }
      return (
        <ScheduleCard
          key={schedule.id}
          id={schedule.id}
          schedule={schedule}
          clicked={clicked}
          checked={true}
          onScheduleSelect={selectHandler}
          slideDirection={slideDirection}
        />
      );
    });
  };

  const moveToLeftMovies = () => {
    setSlideDirection("right");
    setPointer(pointer - 1);
  };

  const moveToRightMovies = () => {
    setSlideDirection("left");
    setPointer(pointer + 1);
  };

  return (
    <Container
      component={"section"}
      maxWidth="xl"
      style={{ marginBottom: "2rem" }}
    >
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item md={1} className={classes.centeredText}>
          {pointer > 0 && (
            <KeyboardArrowLeftIcon
              color="secondary"
              onClick={moveToLeftMovies}
              fontSize="large"
            />
          )}
        </Grid>
        {schedules && cardItemsHandler()}
        <Grid item md={1} className={classes.centeredText}>
          {pointer < results - 3 && (
            <KeyboardArrowRightIcon
              onClick={moveToRightMovies}
              fontSize="large"
              color="secondary"
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
