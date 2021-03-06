import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import AuthContext from "../../store/auth-context";

const useStyles = makeStyles(() => ({
  gridFrom: {
    "& > *": { marginBottom: "1rem" },
  },
  marginLeft: {
    marginLeft: "1rem",
  },
}));

export default function RegisterForm(props) {
  const classes = useStyles();

  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredPasswordConfirmation, setEnteredPasswordConfirmation] =
    useState("");

  const authContext = useContext(AuthContext);
  const history = useHistory();

  const nameInputHandler = (e) => {
    setEnteredName(e.target.value);
  };

  const passwordInputHandler = (e) => {
    setEnteredPassword(e.target.value);
  };

  const emailInputHandler = (e) => {
    setEnteredEmail(e.target.value);
  };

  const passwordConfirmationInputHandler = (e) => {
    setEnteredPasswordConfirmation(e.target.value);
  };

  const fetchUserData = async () => {
    const response = await fetch("http://127.0.0.1:3000/api/v1/users/signup", {
      method: "POST",
      body: JSON.stringify({
        name: enteredName,
        email: enteredEmail,
        password: enteredPassword,
        passwordConfirm: enteredPasswordConfirmation,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      authContext.login(data.token, data.tokenExpiration);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    fetchUserData();
    history.push("/");

    setEnteredEmail("");
    setEnteredPassword("");
  };

  return (
    <form
      noValidate
      autoComplete="off"
      className={classes.gridFrom}
      onSubmit={submitHandler}
    >
      <TextField
        onChange={nameInputHandler}
        id="name"
        label="Name"
        placeholder="Enter your name and surname"
        variant="outlined"
        fullWidth={true}
        value={enteredName}
      />
      <TextField
        onChange={emailInputHandler}
        id="email"
        label="Email"
        placeholder="Enter your Email Address"
        variant="outlined"
        fullWidth={true}
        value={enteredEmail}
      />
      <TextField
        onChange={passwordInputHandler}
        id="password"
        label="Password"
        placeholder="Enter your Password"
        variant="outlined"
        fullWidth={true}
        value={enteredPassword}
      />
      <TextField
        onChange={passwordConfirmationInputHandler}
        id="passwordConfirmation"
        label="Password Confirmation"
        placeholder="Enter your Password one more time"
        variant="outlined"
        fullWidth={true}
        value={enteredPasswordConfirmation}
      />
      <Button
        type="submit"
        variant="contained"
        size="large"
        color="primary"
        disabled={!enteredEmail || !enteredPassword ? true : false}
      >
        Ready
      </Button>
      <Button
        className={classes.marginLeft}
        variant="text"
        size="large"
        color="default"
        onClick={props.changeFormHandler}
      >
        I already have an account!
      </Button>
    </form>
  );
}
