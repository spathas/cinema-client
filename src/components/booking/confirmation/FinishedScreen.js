import { useState, useEffect, useContext } from "react";

//CONTEXTES
import BookingContext from "../../../store/booking-context";
import AuthContext from "../../../store/auth-context";

function FinishedScreen() {
  const [bookingId, setBookingId] = useState();

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

  return <div>test</div>;
}

export default FinishedScreen;
