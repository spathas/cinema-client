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

export default function LoginForm(props) {
  const classes = useStyles();

  const [enteredEmail, setEnteredEmail] = useState("");
  const [validationEnteredEmail, setValidationEnteredEmail] = useState(true);
  const [enteredPassword, setEnteredPassword] = useState("");
  const [validationPasswordEmail, setValidationPasswordEmail] = useState(true);
  const [forgotPassword, setForgotPassword] = useState(false);

  const authContext = useContext(AuthContext);
  const history = useHistory();

  const emailInputHandler = (e) => {
    setEnteredEmail(e.target.value);
  };

  const passwordInputHandler = (e) => {
    setEnteredPassword(e.target.value);
  };

  const fetchUserData = async () => {
    const response = await fetch("http://127.0.0.1:3000/api/v1/users/login", {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      authContext.login(data.data.user, data.expires);
      history.push("/");
    } else {
      setForgotPassword(true);
      setValidationEnteredEmail(false);
      setValidationPasswordEmail(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    //Validation for email input
    if (enteredEmail.trim().length < 3 && !enteredEmail.includes(["@", "."])) {
      setValidationEnteredEmail(false);
      return;
    }

    //Validation for password input
    if (enteredPassword.trim().length < 4) {
      setValidationPasswordEmail(false);
      return;
    }

    setValidationEnteredEmail(true);
    setValidationPasswordEmail(true);

    fetchUserData();

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
        error={!validationEnteredEmail}
        onChange={emailInputHandler}
        id="email"
        label="Email"
        placeholder="Enter your email address"
        variant="outlined"
        fullWidth={true}
        value={enteredEmail}
      />
      <TextField
        error={!validationPasswordEmail}
        onChange={passwordInputHandler}
        id="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        variant="outlined"
        fullWidth={true}
        value={enteredPassword}
      />
      <Button
        type="submit"
        variant="contained"
        size="large"
        color="primary"
        disabled={!enteredEmail || !enteredPassword ? true : false}
      >
        Submit
      </Button>
      <Button
        className={classes.marginLeft}
        variant="text"
        size="large"
        color="default"
        onClick={props.changeFormHandler}
      >
        Create a new account
      </Button>
      {forgotPassword && (
        <Button
          type="submit"
          variant="contained"
          size="small"
          color="secondary"
          onClick={() => {
            history.push("/forgotPassword");
          }}
        >
          I forget my password
        </Button>
      )}
    </form>
  );
}
