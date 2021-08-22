import { Route, Switch, Redirect } from "react-router-dom";

import "./App.css";

//components
import Layout from "./components/layout/Layout";
import MainPage from "./pages/MainPage";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import About from "./components/department/About";
import AuthForm from "./pages/AuthForm";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <MainPage />
        </Route>
        <Route path="/movies" exact>
          <Movies />
        </Route>
        <Route path="/movies/:movieId">
          <MovieDetails />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/login">
          <AuthForm />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
