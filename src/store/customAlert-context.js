import { createContext, useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

//MUI
import Alert from "@material-ui/lab/Alert";
import LinearProgress from "@material-ui/core/LinearProgress";

//STYLE
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "40%",
    position: "fixed",
    zIndex: "1000",
    top: "0",
    left: "30%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

//ENUM
export const STATUSES = {
  // Status styles: error, warning, info, success
  authRequired: {
    status: "warning",
    message: "Please login to continue...",
  },
};

const CustomAlertContext = createContext({
  alert: {},
  setAlert: (message, timer) => {},
});

export const CustomAlertContextProvider = (props) => {
  const [alertKey, setAlertKey] = useState("");
  const [status, setStatus] = useState("invalid value");
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(0);
  const [trigger, setTrigger] = useState(false);
  const [progress, setProgress] = useState(1);
  const [dateNow, setDateNow] = useState();

  const classes = useStyles();
  const history = useHistory();
  let firstRender = useRef(true);

  // When use close alert is called
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      switch (alertKey) {
        // Authrization required functionality
        case "authRequired": {
          let timeout;
          let interval;

          if (trigger) {
            interval = setInterval(() => {
              const timestamp = Math.round(
                ((Date.now() - dateNow) / timer) * 100
              );
              setProgress(timestamp + 1);
            }, timer / 100);
            timeout = setTimeout(() => {
              setTrigger(false);
            }, timer);
          }
          if (!trigger) {
            history.push("/auth");
          }

          return () => {
            clearInterval(interval);
            clearTimeout(timeout);
          };
        }
        // Others functionalities
        default:
          return;
      }
    }
  }, [timer, trigger, history, alertKey, progress, dateNow]);

  const setAlert = (alertKey, timer) => {
    //Check for correct status string
    if (!(alertKey in STATUSES)) {
      console.log("error");
      const statuesKeys = Object.keys(STATUSES).toString();
      throw new Error(
        `Invalide status code please insert one of four values: ${statuesKeys}`
      );
    } else {
      let alertObj = STATUSES[alertKey];

      setAlertKey(alertKey);
      setStatus(alertObj.status);
      setMessage(alertObj.message);
      setTimer(timer);
      setTrigger(true);
      setDateNow(Date.now());
    }
  };

  const contextValue = {
    alert: {
      status,
      message,
    },
    setAlert,
  };

  return (
    <CustomAlertContext.Provider value={contextValue}>
      <>
        {trigger && (
          <div className={classes.root}>
            <Alert
              onClose={() => {
                setTrigger(false);
              }}
              severity={status}
            >
              {message}
            </Alert>
            <LinearProgress
              style={{ marginTop: "-4px" }}
              color="secondary"
              variant="determinate"
              value={progress}
            />
          </div>
        )}
        {props.children}
      </>
    </CustomAlertContext.Provider>
  );
};

export default CustomAlertContext;
