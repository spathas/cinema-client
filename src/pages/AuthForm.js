import { useState } from "react";
import { Container, Grid, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import LoginForm from "../components/authForms/LoginForm";
import RegisterForm from "../components/authForms/RegisterForm";

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
}));

export default function AuthForm() {
  const classes = useStyles();

  const [openRegisterForm, setOpenRegisterForm] = useState(false);

  const createNewAccount = () => {
    setOpenRegisterForm(true);
  };

  const loginToAccount = () => {
    setOpenRegisterForm(false);
  };

  return (
    <Box className={classes.container}>
      <Container maxWidth="xs">
        <Grid
          container
          spacing={4}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item className={classes.gridFrom}>
            <Typography variant="h2" color="primary">
              {openRegisterForm ? "Register Form" : "Login Form"}
            </Typography>
          </Grid>
          {openRegisterForm && (
            <RegisterForm changeFormHandler={loginToAccount} />
          )}
          {!openRegisterForm && (
            <LoginForm changeFormHandler={createNewAccount} />
          )}
        </Grid>
      </Container>
    </Box>
  );
}
