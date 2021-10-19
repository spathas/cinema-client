import { useState, useEffect } from "react";

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

export const CustomAlert = (props) => {
  const [trigger, setTrigger] = useState(true);
  const [progress, setProgress] = useState(0);
  const [intervalExpired, setIntervalExpired] = useState(false);
  const [closeClicked, setCloseClicked] = useState(false);

  const classes = useStyles();
  let itnerval;
  useEffect(() => {
    let value = 0;
    const interval = setInterval(() => {
      value += 1;
      console.log("exec");
      setProgress(value);
      if (value >= 100) {
        clearInterval(itnerval);
        setTrigger(false);
        setIntervalExpired(true);
      }
    }, props.timer / 100);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (intervalExpired && !closeClicked) {
      props.onPassAlertTime();
      setCloseClicked(false);
      setTrigger(false);
    }
  }, [closeClicked, intervalExpired, props]);

  const onCloseHandler = () => {
    props.onCloseAlert();
    setTrigger(false);
    setCloseClicked(true);
  };

  const progressColorHandler = () => {
    switch (props.status) {
      case "error":
        return "secondary";
      case "success":
        return "primary";
      case "info":
        return "primary";
      case "warning":
        return "primary";
      default:
        throw new Error(`Unknown status ${props.status}`);
    }
  };

  return (
    <>
      {trigger && (
        <div className={classes.root}>
          <Alert onClose={onCloseHandler} severity={props.status}>
            {props.message}
          </Alert>
          <LinearProgress
            style={{ marginTop: "-4px" }}
            color={progressColorHandler()}
            variant="determinate"
            value={progress}
          />
        </div>
      )}
    </>
  );
};

export default CustomAlert;
