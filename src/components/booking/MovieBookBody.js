import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Grid from "@material-ui/core/Grid";

import BookingTimeCart from "./BookingTimeCart";

const MovieBookBody = () => {
  const [schedules, setSchedules] = useState([]);
  const [clickedSchedule, setClickedSchedule] = useState();

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
        <BookingTimeCart
          key={schedule.id}
          id={schedule.id}
          schedule={schedule}
          clicked={clicked}
          oneTimeSelect={selectHandler}
        />
      );
    });

  return (
    <Grid container>
      <Grid container item xl={12} spacing={2}>
        {selectSchedule()}
      </Grid>
    </Grid>
  );
};

export default MovieBookBody;
