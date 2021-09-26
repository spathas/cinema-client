import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Grid from "@material-ui/core/Grid";

import BookingScheduleCard from "./BookingScheduleCard";

const MovieBookBody = (props) => {
  const [schedules, setSchedules] = useState([]);
  const [clickedSchedule, setClickedSchedule] = useState();

  const step = props.step;

  const movieId = useParams().movieId;

  useEffect(() => {
    fetch(
      //queries -> movieid | sort by screeningStart (features from backend [utils-> featuresAPI])
      `http://localhost:3000/api/v1/schedules?movie=${movieId}&sort=screeningStart`
    )
      .then((response) => response.json())
      .then((data) => {
        setSchedules(data.data.data);
      })
      .catch((error) => console.log(error));
  }, [movieId]);

  const selectHandler = (id) => {
    setClickedSchedule(id);
  };

  const selectSchedule = () =>
    schedules.map((schedule) => {
      let clicked = false;
      if (schedule.id === clickedSchedule) {
        clicked = true;
      }
      return (
        <BookingScheduleCard
          key={schedule.id}
          id={schedule.id}
          schedule={schedule}
          clicked={clicked}
          onScheduleSelect={selectHandler}
        />
      );
    });

  return (
    <Grid container>
      <Grid container direction="row" item xl={12} spacing={2}>
        {step === 1 && selectSchedule()}
        {step === 2 && "nothing"}
        {step === 3 && "nothing"}
      </Grid>
    </Grid>
  );
};

export default MovieBookBody;
