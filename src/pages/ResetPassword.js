import { useState } from "react";
// import { useHistory } from "react-router-dom";
import { Container, TextField, Button, Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  marginBottom: {
    marginBottom: "1rem",
  },
}));

export default function ResetPassword() {
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredPasswordConfirmation, setEnteredPasswordConfirmation] =
    useState("");
  const [passwordError, setPasswordError] = useState(false);

  //   const history = useHistory();
  const classes = useStyles();

  const passwordInputHandler = (e) => {
    enteredPassword(e.target.value);
  };

  const passwordConfirmationInputHandler = (e) => {
    enteredPassword(e.target.value);
  };

  const fetchUserData = async () => {
    const response = await fetch(
      `http://127.0.0.1:3000/api/v1/users/resetPassword/}`,
      {
        method: "POST",
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
      const data = await response.json();
      console.log(data.token);
    } else {
      setPasswordError(true);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    fetchUserData();

    setEnteredPassword("");
    setEnteredPasswordConfirmation("");
  };

  return (
    <Container maxWidth="sm">
      <Typography className={classes.marginBottom} variant="h3" color="primary">
        Enter your email address!
      </Typography>
      <form noValidate autoComplete="off" onSubmit={submitHandler}>
        <TextField
          className={classes.marginBottom}
          onChange={passwordInputHandler}
          id="email"
          label="Email"
          color={passwordError ? "secondary" : "primary"}
          placeholder="Enter your password"
          variant="outlined"
          fullWidth={true}
          value={enteredPassword}
        />
        <TextField
          className={classes.marginBottom}
          onChange={passwordConfirmationInputHandler}
          id="email"
          label="Email"
          color={passwordError ? "secondary" : "primary"}
          placeholder="Enter your password confirmation"
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
            !enteredPassword && !enteredPasswordConfirmation ? true : false
          }
        >
          Change Password
        </Button>
      </form>
    </Container>
  );
}
