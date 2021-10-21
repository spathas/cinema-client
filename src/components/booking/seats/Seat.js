import { useState, useContext } from "react";

//MUI
import EventSeatIcon from "@material-ui/icons/EventSeat";
import Grid from "@material-ui/core/Grid";

//CONTEXTES
import BookingContext from "../../../store/booking-context";

//STYLES
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  disabled: {
    display: "nonne",
    visibility: "hidden",
  },
}));

function Seat(props) {
  const [status, setStatus] = useState(props.status);

  const classes = useStyles();

  //Attention columns and rows are reversed in schemaSeats dont confused!!!!!
  // col -1 because we add 1 at seatsScreen to start columns
  const row = +props.id.split("")[0] - 1;
  const col = +props.id.split("")[1] - props.indexPrefix;

  const bookingContext = useContext(BookingContext);
  const seatsSchema = bookingContext.scheduleData.hall.seatsSchema;

  const clickHandler = () => {
    switch (status) {
      case "open":
        setStatus("closed");
        seatsSchema[col][row] = "closed";
        bookingContext.setSeat(props.id);
        break;
      case "closed":
        setStatus("open");
        seatsSchema[col][row] = "open";
        bookingContext.deleteSeats(props.id);
        break;
      case "disabled":
        break;
      case "empty":
        break;
      default:
        throw new Error("Invalid status");
    }
    // console.log("Seat: ", props.id, props.status);
  };

  const generateSeat = () => {
    let el;
    let className;

    switch (status) {
      case "open":
        el = <EventSeatIcon color="primary" style={{ cursor: "copy" }} />;
        break;
      case "closed":
        el = <EventSeatIcon color="secondary" style={{ cursor: "no-drop" }} />;
        break;
      case "empty":
        el = (
          <EventSeatIcon style={{ color: "transparent", userSelect: "none" }} />
        );
        className = classes.disabled;
        break;
      case "disabled":
        el = (
          <EventSeatIcon color="disabled" style={{ cursor: "not-allowed" }} />
        );
        break;
      default:
        throw new Error(`Status not supported! ${status}`);
    }

    //Non clickable component for empty status.
    if (className)
      return (
        <Grid item md={1} className={className}>
          {el}
        </Grid>
      );

    return (
      <Grid item md={1} onClick={clickHandler}>
        {el}
      </Grid>
    );
  };

  return <>{generateSeat()}</>;
}

export default Seat;
