import { useState, useEffect, useContext } from "react";

//MUI
import Alert from "@material-ui/lab/Alert";
import LinearProgress from "@material-ui/core/LinearProgress";

//CONTEXTES
import CustomAlertContext from "../../store/customAlert-context";

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

  const classes = useStyles();
  const customAlertContext = useContext(CustomAlertContext);

  //https://stackoverflow.com/questions/56442582/react-hooks-cant-perform-a-react-state-update-on-an-unmounted-component
  let value = 0;
  useEffect(() => {
    const itnerval = setInterval(() => {
      console.time("intervals");
      value += 1;
      setProgress(value);
      if (value >= 100) {
        console.log("execute");
        setTrigger(false);
        customAlertContext.setTrigger(false);
        clearInterval(itnerval);
        console.timeEnd("intervals");
      }

      return () => {};
    }, props.timer / 100);
  }, []);

  return (
    <>
      {trigger && (
        <div className={classes.root}>
          <Alert
            onClose={() => {
              setTrigger(false);
              customAlertContext.setTrigger(false);
            }}
            severity={props.status}
          >
            {props.message}
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
  );
};

export default CustomAlert;
