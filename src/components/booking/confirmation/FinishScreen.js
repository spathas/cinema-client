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
    flexGrow: 1,
    background: theme.palette.dark,
    padding: "3rem",
  },
  divider: {
    background: theme.palette.divider,
  },
}));

function FinishedScreen(props) {
  const [bookingId, setBookingId] = useState();

  const classes = useStyles();

  const authContext = useContext(AuthContext);
  const bookingContext = useContext(BookingContext);

  const user = authContext.user._id;
  const token = authContext.token;
  const seats = bookingContext.seats;
  const schedule = bookingContext.scheduleData.id;
  const price = bookingContext.scheduleData.hall.price * seats.length;
  let seatsSchema = bookingContext.scheduleData.hall.seatsSchema;

  seatsSchema = seatsSchema.map((column) =>
    column.map((row) => (row === "closed" ? (row = "disabled") : row))
  );

  console.log(JSON.stringify({ hall: { seatsSchema } }));

  const updateSchema = async () => {
    const response = await fetch(
      `http://localhost:3000/api/v1/schedules/${schedule}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          hall: { seatsSchema },
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    if (response.ok) {
      console.log(data);
      return;
    } else {
      throw new Error("Error: ", data);
    }
  };

  const postBookingData = async () => {
    const response = await fetch("http://localhost:3000/api/v1/bookings", {
      method: "POST",
      body: JSON.stringify({
        schedule,
        user,
        token,
        seats,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (response.ok) {
      await updateSchema();
      setBookingId(data.data.data.id);
      props.onCheckBooking(true);
    } else {
      console.log("Error booking: ", data);
      props.onCheckBooking(false);
    }
  };

  useEffect(() => {
    postBookingData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pluralTicket = seats.length > 1 ? "seats" : "seat";
  return (
    <>
      {bookingId && (
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
              {bookingId}
            </Typography>
          </Grid>
          <Grid item md={12}>
            <Typography color="primary" variant="subtitle1" align="center">
              Visit ticket office to recieve your {pluralTicket}. You will pay
              the {pluralTicket} to the ticket office.
            </Typography>
            <Typography color="primary" variant="h5" align="center">
              Price: {price}€
            </Typography>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default FinishedScreen;
