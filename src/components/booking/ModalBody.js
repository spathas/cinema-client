import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ScheduleCardList from "./schedules/ScheduleCardList";
import SeatsScreen from "./SeatsScreen";

const MovieBookBody = (props) => {
  const [schedules, setSchedules] = useState([]);
  const [results, setResults] = useState(0);
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
        setResults(data.results);
      })
      .catch((error) => console.log(error));
  }, [movieId]);

  return (
    <>
      {step === 1 && (
        <ScheduleCardList schedules={schedules} results={results} />
      )}
      {step === 2 && <SeatsScreen />}
      {step === 3 && "Step3"}
    </>
  );
};

export default MovieBookBody;

// TODO: Parse user to booking context
// TODO: Create second screen to chooce seats
