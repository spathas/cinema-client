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
        setStatus("closed");
        bookingContext.setSeat(props.id);
        break;
      case "closed":
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
  };

  const generateSeat = () => {
    switch (status) {
      case "open":
        return <EventSeatIcon color="primary" style={{ cursor: "copy" }} />;
      case "closed":
        return (
          <EventSeatIcon color="secondary" style={{ cursor: "no-drop" }} />
        );
      case "empty":
        return <EventSeatIcon style={{ color: "transparent" }} />;
      default:
        return (
          <EventSeatIcon color="disabled" style={{ cursor: "not-allowed" }} />
        );
    }
  };

  return (
    <Grid item md={1} onClick={clickHandler}>
      {generateSeat()}
    </Grid>
  );
}

export default Seat;
