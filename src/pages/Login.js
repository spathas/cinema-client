import { useState, useContext } from "react";
import AuthContext from "../store/auth-context";
import {
  Container,
  Grid,
  TextField,
  Typography,
  Box,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  "@global": {
    body: {
      overflow: "hidden",
    },
  },
  container: {
    height: "100vh",
    background:
      " linear-gradient(to top, #ffefba, #ffffff)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
  },
  gridFrom: {
    "& > *": { marginBottom: "1rem" },
  },
}));

export default function LoginForm() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const authContext = useContext(AuthContext);

  const classes = useStyles();

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

    setEnteredEmail("");
    setEnteredPassword("");
  };

  return (
    <Box className={classes.container}>
      <Container maxWidth="md">
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item md={6} className={classes.gridFrom}>
            <Typography variant="h2" color="primary">
              Login Form
            </Typography>
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
              >
                Submit
              </Button>
            </form>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
