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
  const [enteredPassword, setEnteredPassword] = useState("");

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
        onChange={emailInputHandler}
        id="email"
        label="Email"
        placeholder="Enter your email address"
        variant="outlined"
        fullWidth={true}
        value={enteredEmail}
      />
      <TextField
        onChange={passwordInputHandler}
        id="password"
        label="Password"
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
    </form>
  );
}
