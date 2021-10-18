import { useState, useContext } from "react";

//MUI
import EventSeatIcon from "@material-ui/icons/EventSeat";
import Grid from "@material-ui/core/Grid";

//CONTEXTES
import BookingContext from "../../../store/booking-context";

function Seat(props) {
  const [status, setStatus] = useState(props.status);

  const bookingContext = useContext(BookingContext);

  const clickHandler = () => {
    switch (status) {
      case "open":
        setStatus("selected");
        bookingContext.setSeat(props.id);
        break;
      case "selected":
        setStatus("open");
        bookingContext.deleteSeats(props.id);
        break;
      case "disabled":
        break;
      case "empty":
        break;
      default:
        throw new Error("Invalid color");
    }
    console.log(bookingContext.seats);
  };

  const generateSeat = () => {
    switch (status) {
      case "open":
        return <EventSeatIcon color="primary" />;
      case "selected":
        return <EventSeatIcon color="secondary" />;
      case "closed":
        return <EventSeatIcon color="disabled" />;
      case "empty":
        return <EventSeatIcon style={{ color: "transparent" }} />;
      default:
        return <EventSeatIcon color="disabled" />;
    }
  };

  return (
    <Grid item md={1} onClick={clickHandler}>
      {generateSeat()}
    </Grid>
  );
}

export default Seat;
