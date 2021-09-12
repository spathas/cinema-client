import { useState, useEffect } from "react";
import { Box } from "@material-ui/core";

import Banner from "../components/layout/Banner";
import MovieCardList from "../components/movies/MovieCardList";
import CinemaAbout from "../components/department/CinemaAbout";
import CinemaStory from "../components/department/CinemaStory";
import CinemaPlaces from "../components/department/CinemaPlaces";

const MainPage = () => {
  const [movies, setMovies] = useState([]);
  const [movieNames, setMovieNames] = useState([]);
  const [results, setResults] = useState();

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/movies")
      .then((response) => response.json())
      .then((data) => {
        let movies = data.data.data;

        //Filter to takes first 4 elements of data!
        if (data.results.length > 5) {
          movies = movies.slice(0, 5);
        }
        setMovies(movies);
        setMovieNames(
          movies.map((m) => {
            return m.name;
          })
        );
        setResults(data.results);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Box bgcolor="primary.light">
      <Banner movieNames={movieNames} />
      <MovieCardList movies={movies} results={results} />
      <CinemaAbout />
      <CinemaStory />
      <CinemaPlaces />
    </Box>
  );
};

export default MainPage;
