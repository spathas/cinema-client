import { useContext } from "react";

//MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

//CONTEXTES
import BookingContext from "../../../store/booking-context";
import AuthContext from "../../../store/auth-context";

//STYLE
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  ticket: {
    width: "100%",
    height: "16rem",
    position: "relative",
    border: "5px solid",
    borderColor: theme.palette.secondary.dark,
    background: theme.palette.primary.light,
    color: theme.palette.secondary.dark,
    textTransform: "uppercase",
    textAlign: "center",
    display: "inline-block",
    padding: "1em 4em",
    margin: "1em 0rem",
    clipPath:
      "polygon(5% 15%, 0 35%, 0 0, 100% 0, 100% 35%, 95% 15%, 95% 85%, 100% 65%, 100% 100%, 0 100%, 0 65%, 5% 85%)",
  },
}));

function ConfirmationScreen() {
  const classes = useStyles();

  const authContext = useContext(AuthContext);
  const bookingContext = useContext(BookingContext);

  const calcTotalPrice = () => {
    let totalPrice = 0;
    bookingContext.seats.forEach(() => {
      totalPrice += bookingContext.scheduleData.hall.price * 1;
    });

    return totalPrice;
  };

  return (
    <div
      className={classes.ticket}
      direction="rows"
      justifyContent="flex-start"
    >
      <Grid
        container
        spacing={2}
        md={12}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item container spacing={3} justifyContent="center">
          <Grid item>
            <Typography align="center" variant="h6">
              {authContext.user.name}
            </Typography>
          </Grid>
          <Grid item>
            <Typography align="center" variant="h6">
              {authContext.user.email}
            </Typography>
          </Grid>
        </Grid>

        <Grid item container md={6} spacing={2}>
          <Grid item container md={12} spacing={1} justifyContent="flex-start">
            <Grid item>
              <Typography align="center" variant="subtitle1">
                Booking Time:
              </Typography>
            </Grid>
            <Grid item>
              <Typography align="center" variant="subtitle1">
                {new Date(
                  bookingContext.scheduleData.screeningStart
                ).toLocaleString()}
              </Typography>
            </Grid>
          </Grid>

          <Grid item container md={12} spacing={1} justifyContent="flex-start">
            <Grid item>
              <Typography align="center" variant="subtitle1">
                Screening end:
              </Typography>
            </Grid>
            <Grid item>
              <Typography align="center" variant="subtitle1">
                {
                  new Date(bookingContext.scheduleData.screeningEnd)
                    .toLocaleString()
                    .toString()
                    .split(",")[1]
                }
              </Typography>
            </Grid>
          </Grid>

          <Grid item container md={12} spacing={1} justifyContent="flex-start">
            <Grid item>
              <Typography align="center" variant="subtitle1">
                seatings Booked:
              </Typography>
            </Grid>
            <Grid item>
              <Typography align="center" variant="subtitle1">
                {bookingContext.seats.map((seat, i, a) => {
                  if (i + 1 >= a.length) return `${seat}`;
                  return `${seat}, `;
                })}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item container md={6} justifyContent="center" spacing={2}>
          <Grid item md={12}>
            <Typography align="center" variant="subtitle2">
              How to recieve your booking.
            </Typography>
          </Grid>
          <Grid item md={12}>
            <Typography align="center" variant="body2">
              You will receive your booking code by email to you email address
              <Box
                fontWeight="fontWeightMedium"
                display="inline"
              >{` ${authContext.user.email} `}</Box>
              .Or copy the code on the screen when you click the finish button.
            </Typography>
          </Grid>

          <Grid item container md={12} spacing={1} justifyContent="flex-start">
            <Grid item>
              <Typography align="center" variant="h6">
                Price:
              </Typography>
            </Grid>
            <Grid item>
              <Typography align="center" variant="h6">
                {calcTotalPrice()}€
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default ConfirmationScreen;
