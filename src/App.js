import { Route, Switch, Redirect } from "react-router-dom";

import "./App.css";

//components
import Layout from "./components/layout/Layout";
import MainPage from "./pages/MainPage";
import MovieDetails from "./pages/MovieDetails";
import AuthForm from "./pages/AuthForm";
import ForgotPassword from "./pages/ForgotPassword";

import CssBaseline from "@material-ui/core/CssBaseline";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "*::-webkit-scrollbar": {
          width: "0.4em",
          height: "0.5em",
        },
        "*::-webkit-scrollbar-track": {
          "-webkit-box-shadow": "inset 0 0 6px #ffb74d",
          borderRadius: "500px",
        },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: "#f06292",
          borderRadius: "500px",
        },
      },
    },
    MuiButton: {
      text: {
        background: "linear-gradient(45deg, #f06292 50%, #ffb74d 90%)",
        boxShadow: "3px 3px 10px 0px rgba(0, 0, 0, .7)",
        borderRadius: 3,
        border: 0,
        color: "white",
        height: 48,
        padding: "0 30px",
        "&:hover": {
          transform: "scale(0.98)",
          boxShadow: "0px 0px 12px 4px rgba(240, 98, 146, .7)",
        },
      },
    },
  },
  palette: {
    divider: "#ffe0b2",
    primary: {
      light: "#ffe0b2",
      main: "#ffb74d",
      dark: "#ef6c00",
    },
    secondary: {
      light: "#f8bbd0",
      main: "#f06292",
      dark: "#ad1457",
    },
    dark: "#404040",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Switch>
          <Route path="/" exact>
            <MainPage />
          </Route>
          <Route path="/movies" exact>
            <MovieDetails />
          </Route>
          <Route path="/movies/:movieId">
            <MovieDetails />
          </Route>
          <Route path="/auth">
            <AuthForm />
          </Route>
          <Route path="/forgotPassword">
            <ForgotPassword />
          </Route>
          <Route path="/resetPassword">
            <ForgotPassword />
          </Route>
          <Route path="*">
            <Redirect to="*" />
          </Route>
        </Switch>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
