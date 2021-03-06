import { useState, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";

//MUI
import PropTypes from "prop-types";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import SettingsIcon from "@material-ui/icons/Settings";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import VideoLabelIcon from "@material-ui/icons/VideoLabel";
import StepConnector from "@material-ui/core/StepConnector";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

//COMPONETS
import ModalBody from "./ModalBody";
import FinishScreen from "./confirmation/FinishScreen";
//CONTEXT
import AuthContext from "../../store/auth-context";
import BookingContext from "../../store/booking-context";
import CustomAlert from "../utils/CustomAlert";

//STYLES
import { makeStyles, withStyles } from "@material-ui/core/styles";

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  completed: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  completed: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: "#404040",
  },
  label: {
    color: theme.palette.primary.main,
  },
  button: {
    marginRight: theme.spacing(1),
    color: "white",
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

// Title of modal by step num.
function getSteps() {
  return ["Select schedule", "Select seats", "Finish with your booking"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return "Select screening time and hall.";
    case 1:
      return "What is an ad group anyways?";
    case 2:
      return "This is the bit I really care about!";
    default:
      return "Unknown step";
  }
}

export default function CustomizedSteppers() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [alertTrigger, setAlertTrigger] = useState("");

  const authContext = useContext(AuthContext);
  const bookingContext = useContext(BookingContext);

  const steps = getSteps();
  const history = useHistory();
  const location = useLocation();

  const checkBookingHandler = (status) => {
    if (status) {
      setAlertTrigger("booking_pass");
    } else {
      setAlertTrigger("booking_error");
      setActiveStep((prevActiveStep) => prevActiveStep - 2);
    }
  };

  const handleNext = async () => {
    const scheduleStep = () => {
      if (!authContext.user.role) {
        setAlertTrigger("auth");
        return;
      }
      // Check if schedule selected.
      if (bookingContext.scheduleData.id) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        return setAlertTrigger("schedule");
      }
    };

    const seatsStep = () => {
      // Check if seat/s selected
      if (bookingContext.seats.length) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        return setAlertTrigger("seats");
      }
    };

    const bookingStep = async () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      return;
    };

    switch (activeStep) {
      case 0:
        return scheduleStep();
      case 1:
        return seatsStep();
      case 2:
        return bookingStep();
      default:
        return;
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleHome = () => {
    history.push("/");
  };

  //Alert handlers
  const alertHandler = (status, message, timer, onPassAlertTime) => {
    switch (alertTrigger) {
      case "auth":
        return (
          <CustomAlert
            status={"error"}
            message={"Please login to continue..."}
            timer={2000}
            onPassAlertTime={onPassAlertTime}
            onCloseAlert={onCloseAlertHandler}
          />
        );
      case "schedule":
        return (
          <CustomAlert
            status={"info"}
            message={"Please select a schedule to continue..."}
            timer={2000}
            onPassAlertTime={onCloseAlertHandler}
            onCloseAlert={onCloseAlertHandler}
          />
        );
      case "seats":
        return (
          <CustomAlert
            status={"info"}
            message={"Please select at least one seat..."}
            timer={2000}
            onPassAlertTime={onCloseAlertHandler}
            onCloseAlert={onCloseAlertHandler}
          />
        );
      case "booking_error":
        return (
          <CustomAlert
            status={"error"}
            message={"Please select another seatings."}
            timer={2000}
            onPassAlertTime={onCloseAlertHandler}
            onCloseAlert={onCloseAlertHandler}
          />
        );
      case "booking_pass":
        return (
          <CustomAlert
            status={"success"}
            message={"Your booking was successfully"}
            timer={2000}
            onPassAlertTime={onCloseAlertHandler}
            onCloseAlert={onCloseAlertHandler}
          />
        );
      default:
        setAlertTrigger("");
    }
  };

  const onPassAlertTime = () => {
    setAlertTrigger("");
    return location.pathname !== "/auth" ? history.push("/auth") : null;
  };

  const onCloseAlertHandler = () => {
    setAlertTrigger("");
  };

  return (
    <>
      {alertTrigger &&
        alertHandler(
          "error",
          "Please login to continue...",
          4000,
          onPassAlertTime
        )}

      <div className={classes.root}>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography color="primary" className={classes.instructions}>
                All steps completed - your booking is ready.
              </Typography>
              <FinishScreen onCheckBooking={checkBookingHandler} />
              <Button onClick={handleHome} className={classes.button}>
                Home
              </Button>
            </div>
          ) : (
            <div>
              <Typography color="primary" className={classes.instructions}>
                {getStepContent(activeStep)}
              </Typography>
              <ModalBody step={activeStep + 1} />
              <div>
                <Button
                  variant="outlined"
                  color="primary"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.button}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </div>
            </div>
          )}
        </div>
        <Stepper
          style={{ background: "transparent" }}
          alternativeLabel
          activeStep={activeStep}
          connector={<ColorlibConnector />}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel
                classes={{
                  label: classes.label,
                }}
                StepIconComponent={ColorlibStepIcon}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
    </>
  );
}
