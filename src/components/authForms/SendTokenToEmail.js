import { Fragment, useState } from "react";
import { TextField, Button, Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(() => ({
  marginBottom: {
    marginBottom: "1rem",
  },
}));

export default function SendTokenToEmail(props) {
  const [enteredEmail, setEnteredEmail] = useState("admin@example.com");
  const [emailError, setEmailError] = useState(false);
  const [emailSended, setEmailSended] = useState(false);

  const classes = useStyles();

  const emailInputHandler = (e) => {
    setEnteredEmail(e.target.value);
  };

  const tokenHandler = (innerToken) => {
    props.takeToken(innerToken);
  };

  const fetchUserData = async () => {
    const response = await fetch(
      "http://127.0.0.1:3000/api/v1/users/forgotPassword",
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      setEmailSended(true);
      return data.token;
    } else {
      setEmailError(true);
      return null;
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    tokenHandler(await fetchUserData());

    setEnteredEmail("");
  };

  return (
    <Fragment>
      <Typography className={classes.marginBottom} variant="h3" color="primary">
        Enter your email address!
      </Typography>
      <form noValidate autoComplete="off" onSubmit={submitHandler}>
        <TextField
          className={classes.marginBottom}
          onChange={emailInputHandler}
          id="email"
          label="Email"
          color={emailError ? "secondary" : "primary"}
          placeholder={
            emailError ? "Please check your email!" : "Enter your email address"
          }
          variant="outlined"
          fullWidth={true}
          value={enteredEmail}
        />
        <Button
          className={classes.marginBottom}
          type="submit"
          variant="contained"
          size="large"
          color="primary"
          disabled={!enteredEmail ? true : false}
        >
          Send Email
        </Button>
      </form>
      {emailSended && (
        <Typography>
          We have send a link to your email address. Please visit the link to
          reset the your password!
        </Typography>
      )}
    </Fragment>
  );
}
