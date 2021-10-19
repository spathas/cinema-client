import { createContext, useState } from "react";

import CustomAlert from "../components/utils/CustomAlert";

//ENUM
export const STATUSES = ["success", "error", "warning", "info"];

const CustomAlertContext = createContext({
  status: "",
  message: "",
  timer: "",
  triggerValue: false,
  setAlert: (status, message, timer, callback) => {},
  setTrigger: (trigger) => {},
});

export const CustomAlertContextProvider = (props) => {
  const [status, setStatus] = useState("invalid value");
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(0);
  const [triggerValue, setTriggerValue] = useState(false);

  const setAlert = (status, message, timer) => {
    //Check for correct status string
    if (!STATUSES.includes(status)) {
      throw new Error(
        `Invalide status code please insert one of four values: ${status}`
      );
    } else {
      setStatus(status);
      setMessage(message);
      setTimer(timer);
      setTriggerValue(true);
    }
  };

  const setTrigger = (trigger) => {
    return setTriggerValue(trigger);
  };

  const contextValue = {
    status,
    message,
    timer,
    triggerValue,
    setAlert,
    setTrigger,
  };

  return (
    <CustomAlertContext.Provider value={contextValue}>
      {triggerValue && (
        <CustomAlert status={status} message={message} timer={timer} />
      )}
      {props.children}
    </CustomAlertContext.Provider>
  );
};

export default CustomAlertContext;
