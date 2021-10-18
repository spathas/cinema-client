import { useContext } from "react";

//MUI
import Grid from "@material-ui/core/Grid";

//COMPONETS
import Seat from "./Seat";
import SeatsColumn from "./SeatsColumn";
//CONTEXTES
import BookingContext from "../../../store/booking-context";

export default function SeatsScreen(props) {
  const bookingContext = useContext(BookingContext);
  const hallSchema = bookingContext.scheduleData.hall.seatsSchema;

  let indexPrefix = 0;
  const displayColumn = (col, intex) => {
    let iconList = [];

    if (["open", "selected", "disabled"].some((arr) => col.includes(arr))) {
      for (let i = 0; i < col.length; i++) {
        const seatId = `${i + 1}${intex + indexPrefix}`;
        iconList.push(<Seat key={seatId} id={seatId} status={col[i]} />);
      }
      return <SeatsColumn key={`${intex}0`}>{iconList}</SeatsColumn>;
    } else {
      for (let i = 0; i < col.length; i++) {
        const seatId = `empty${i + 1}${intex}`;
        iconList.push(<Seat key={seatId} id={seatId} status={col[i]} />);
      }
      indexPrefix -= 1;
      return <SeatsColumn key={`${intex + 10}0`}>{iconList}</SeatsColumn>;
    }
  };

  const displayHall = () => {
    return hallSchema.map((col, intex) => {
      return displayColumn(col, intex);
    });
  };

  return (
    <Grid container direction="row" spacing={2}>
      <Grid item md={5}>
        test
      </Grid>
      <Grid item container md={7}>
        {displayHall()}
      </Grid>
    </Grid>
  );
}
