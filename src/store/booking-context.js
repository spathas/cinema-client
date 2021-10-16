import { createContext, useState } from "react";

const BookingContext = createContext({
  user: {},
  scheduleData: {},
  seats: "",
  createdAt: "",
  setScheduleData: () => {},
});

export const BookingContextProvider = (props) => {
  const [schedule, setSchedule] = useState({});
  const [seats, setSeats] = useState("");
  const [createdAt, setCreateAt] = useState(new Date(Date.now()));

  //Setters
  const setScheduleData = (data) => {
    setSchedule(data);
  };

  const contetxtValue = {
    scheduleData: schedule,
    seats,
    createdAt,
    setScheduleData,
  };

  return (
    <BookingContext.Provider value={contetxtValue}>
      {props.children}
    </BookingContext.Provider>
  );
};

export default BookingContext;
