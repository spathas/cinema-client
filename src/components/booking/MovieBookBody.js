import { useState, useEffect } from "react";

import Grid from "@material-ui/core/Grid";
import { Card, CardActionArea, CardContent } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const MovieBookBody = (props) => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    fetch(
      "http://localhost:3000/api/v1/schedules?movie=6041ec97b1e4be12e0023c1e"
    )
      .then((response) => response.json())
      .then((data) => {
        setSchedules(data.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const generateScheduleCard = () =>
    schedules.map((schedule) => {
      let displayDay = "Day: " + new Date(schedule.screeningStart).getDate();
      displayDay =
        displayDay + "/" + new Date(schedule.screeningStart).getMonth();

      let displayTime = "Time: " + new Date(schedule.screeningStart).getHours();

      return (
        <Grid item xl={3}>
          <Card xl={{ maxWidth: 100 }}>
            <CardActionArea>
              <CardContent>
                <Typography>
                  {schedule.screeningStart}
                  {displayDay} {displayTime}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      );
    });

  return (
    <Grid container>
      <Grid container item xl={12} spacing={2}>
        {generateScheduleCard()}
      </Grid>
    </Grid>
  );
};

export default MovieBookBody;
