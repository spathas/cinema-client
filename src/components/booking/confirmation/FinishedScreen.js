import { useState, useEffect, useContext } from "react";

//MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

//CONTEXTES
import BookingContext from "../../../store/booking-context";
import AuthContext from "../../../store/auth-context";

//STYLES
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "30vh",
    flexGrow: 1,
    background: theme.palette.dark,
  },
  divider: {
    background: theme.palette.divider,
  },
}));

function FinishedScreen() {
  const [bookingId, setBookingId] = useState();

  const classes = useStyles();

  const authContext = useContext(AuthContext);
  const bookingContext = useContext(BookingContext);

  const userID = authContext.user._id;
  const seats = bookingContext.seats;
  const scheduleID = bookingContext.scheduleData.id;

  console.log(authContext);
  //TODO Protected router crash because of crons and cookies
  useEffect(() => {
    fetch(
      //queries -> movieid | sort by screeningStart (features from backend [utils-> featuresAPI])
      `http://localhost:3000/api/v1/bookings`,
      {
        method: "POST",
        body: JSON.stringify({
          schedule: scheduleID,
          user: userID,
          seats: seats,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBookingId(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      className={classes.container}
      spacing={3}
    >
      <Grid item md={6} align="center">
        <Typography color="primary" variant="h6">
          Booking id
        </Typography>
      </Grid>
      <Grid item md={12}>
        <Typography color="primary" variant="h5" align="center">
          Booking id! I have to deploy the projects or fix the issue with cors
          and cookies.
        </Typography>
      </Grid>
    </Grid>
  );
}

export default FinishedScreen;
