import { createContext, useState } from "react";

const BookingContext = createContext({
  user: {},
  scheduleData: {},
  seats: "",
  createdAt: "",
  setScheduleData: () => {},
  setSeat: () => {},
  deleteSeats: () => {},
});

export const BookingContextProvider = (props) => {
  const [schedule, setSchedule] = useState({});
  const [seats, setSeats] = useState([]);

  //Setters
  const setScheduleData = (data) => {
    setSchedule(data);
  };

  const setSeat = (seat) => {
    setSeats((prevState) => [...prevState, seat]);
  };

  const deleteSeats = (seat) => {
    setSeats(seats.filter((s) => s !== seat));
  };

  const contetxtValue = {
    scheduleData: schedule,
    seats,
    setScheduleData,
    setSeat,
    deleteSeats,
  };

  return (
    <BookingContext.Provider value={contetxtValue}>
      {props.children}
    </BookingContext.Provider>
  );
};

export default BookingContext;
