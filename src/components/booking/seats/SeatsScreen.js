import { useContext } from "react";

//MUI
import Grid from "@material-ui/core/Grid";
//COMPONETS
import PaperLabel from "../../utils/PaperLabel";
import Seat from "./Seat";
import SeatsColumn from "./SeatsColumn";
//CONTEXTES
import BookingContext from "../../../store/booking-context";

const convertDate = (date) => {
  const innerDate = new Date(date);
  const hours =
    innerDate.getHours().toString().length < 2
      ? "0" + innerDate.getHours().toString()
      : innerDate.getHours();
  const minutes =
    innerDate.getMinutes().toString().length < 2
      ? "0" + innerDate.getMinutes().toString()
      : innerDate.getMinutes();

  return `${hours}:${minutes}`;
};

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
  // console.log(bookingContext.scheduleData);
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
        <PaperLabel keyValue={"Price"} value={price} />
      </Grid>
      <Grid item container md={3} direction="column">
        <PaperLabel keyValue={"quantity"} value={seatsQuantity} />
        <PaperLabel keyValue={"Start at"} value={convertDate(screeningStart)} />
        <PaperLabel keyValue={"End at"} value={convertDate(screeningEnd)} />
      </Grid>

      <Grid item container md={6}>
        {displayHall()}
      </Grid>
    </Grid>
  );
}
