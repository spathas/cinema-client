import { useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Typography,
  Box,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    height: "85vh",
    background:
      " linear-gradient(to top, #ffefba, #ffffff)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
  },
  gridFrom: {
    "& > *": { marginBottom: "1rem" },
  },
});

export default function LoginForm() {
  const [enteredName, setEnteredName] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const classes = useStyles();

  const nameInputHandler = (e) => {
    setEnteredName(e.target.value);
  };

  const passwordInputHandler = (e) => {
    setEnteredPassword(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(enteredName, enteredPassword);

    setEnteredName("");
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
                onChange={nameInputHandler}
                id="username"
                label="Username"
                variant="outlined"
                fullWidth={true}
                value={enteredName}
              />
              <TextField
                onChange={passwordInputHandler}
                id="password"
                label="Password"
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
