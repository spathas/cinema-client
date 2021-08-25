import { Fragment, useState } from "react";
import { TextField, Button, Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles(() => ({
  marginBottom: {
    marginBottom: "1rem",
  },
}));

export default function SetNewPassword(props) {
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredPasswordConfirmation, setEnteredPasswordConfirmation] =
    useState("");
  const [passwordError, setPasswordError] = useState(false);

  const classes = useStyles();
  const history = useHistory();
  const token = props.token;

  const passwordInputHandler = (e) => {
    setEnteredPassword(e.target.value);
  };

  const passwordConfirmationInputHandler = (e) => {
    setEnteredPasswordConfirmation(e.target.value);
  };

  const resetUserPasswordHandler = async () => {
    const response = await fetch(
      `http://127.0.0.1:3000/api/v1/users/resetPassword/${token}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          password: enteredPassword,
          passwordConfirm: enteredPasswordConfirmation,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      history.replace("/login");
    } else {
      setEnteredPassword("");
      setEnteredPasswordConfirmation("");
      setPasswordError(true);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    await resetUserPasswordHandler();
  };

  return (
    <Fragment>
      <Typography className={classes.marginBottom} variant="h3" color="primary">
        Enter your email address!
      </Typography>
      <form noValidate autoComplete="off" onSubmit={submitHandler}>
        <TextField
          className={classes.marginBottom}
          onChange={passwordInputHandler}
          id="password"
          label="Passowrd"
          color={passwordError ? "secondary" : "primary"}
          placeholder={"Enter your password"}
          variant="outlined"
          fullWidth={true}
          value={enteredPassword}
        />
        <TextField
          className={classes.marginBottom}
          onChange={passwordConfirmationInputHandler}
          id="passwordConf"
          label="Passowrd Confirmation"
          color={passwordError ? "secondary" : "primary"}
          placeholder={"Enter your password one more time"}
          variant="outlined"
          fullWidth={true}
          value={enteredPasswordConfirmation}
        />
        <Button
          className={classes.marginBottom}
          type="submit"
          variant="contained"
          size="large"
          color="primary"
          disabled={
            !enteredPasswordConfirmation || !enteredPassword
              ? true
              : enteredPassword !== enteredPasswordConfirmation
              ? true
              : false
          }
        >
          Send Email
        </Button>
      </form>
    </Fragment>
  );
}
