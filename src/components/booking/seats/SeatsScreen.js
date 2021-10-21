import { useContext } from "react";

//MUI
import Grid from "@material-ui/core/Grid";
//COMPONETS
import PaperLabel from "../../utils/PaperLabel";
import Seat from "./Seat";
import SeatsColumn from "./SeatsColumn";
//CONTEXTES
import BookingContext from "../../../store/booking-context";

export default function SeatsScreen(props) {
  const bookingContext = useContext(BookingContext);

  const hallSchema = bookingContext.scheduleData.hall.seatsSchema;
  const hallNumber = bookingContext.scheduleData.hall.number;
  const hallType = bookingContext.scheduleData.hall.typeOfHall;
  const seatsQuantity = bookingContext.scheduleData.hall.seatsQuantity;
  const price = bookingContext.scheduleData.hall.price;
  const screeningStart = bookingContext.scheduleData.screeningStart;
  const screeningEnd = bookingContext.scheduleData.screeningEnd;

  let indexPrefix = 0;
  const displayColumn = (col, intex) => {
    let iconList = [];

    //Display schema of hall, set transparent all empty seats from schema.
    if (["open", "closed", "disabled"].some((arr) => col.includes(arr))) {
      for (let i = 0; i < col.length; i++) {
        const seatId = `${i + 1}${intex + indexPrefix}`;

        //Check for selected seats by user
        if (bookingContext.seats.includes(seatId)) {
          iconList.push(
            <Seat
              key={seatId}
              id={seatId}
              status={"closed"}
              indexPrefix={indexPrefix}
            />
          );
        } else {
          iconList.push(
            <Seat
              key={seatId}
              id={seatId}
              status={col[i]}
              indexPrefix={indexPrefix}
            />
          );
        }
      }
      return <SeatsColumn key={`${intex}0`}>{iconList}</SeatsColumn>;
    } else {
      for (let i = 0; i < col.length; i++) {
        const seatId = `empty${i + 1}${intex}`;
        iconList.push(
          <Seat
            key={seatId}
            id={seatId}
            status={col[i]}
            indexPrefix={indexPrefix}
          />
        );
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
    <Grid
      container
      direction="row"
      spacing={2}
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item container md={3} direction="column">
        <PaperLabel keyValue={"Hall number"} value={hallNumber} />
        <PaperLabel keyValue={"Hall type"} value={hallType} />
        <PaperLabel keyValue={"Price"} value={`${price} per seat`} />
      </Grid>
      <Grid item container md={3} direction="column">
        <PaperLabel
          keyValue={"quantity"}
          value={`${seatsQuantity} seating${seatsQuantity > 1 ? "s" : ""}`}
        />
        <PaperLabel
          keyValue={"Starts at"}
          value={
            new Date(screeningStart).toLocaleString().toString().split(",")[1]
          }
        />
        <PaperLabel
          keyValue={"Ends at"}
          value={
            new Date(screeningEnd).toLocaleString().toString().split(",")[1]
          }
        />
      </Grid>

      <Grid item container md={6}>
        {displayHall()}
      </Grid>
    </Grid>
  );
}
