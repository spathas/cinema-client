import { createContext, useState } from "react";

const BookingContext = createContext({
  user: {},
  schedule: {},
  seats: "",
  createdAt: "",
  setScheduleData: () => {},
});

export const BookingContextProvider = (props) => {
  const [user] = useState({})[0];
  const [schedule, setSchedule] = useState({})[0];
  const [seats] = useState("")[0];
  const [createdAt] = useState(new Date(Date.now()))[0];

  //Setters
  const setScheduleData = (data) => {
    setSchedule(data);
  };

  const contetxtValue = {
    user,
    schedule,
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

//TODO: Dont forget to refactor states when you will start with booking again
