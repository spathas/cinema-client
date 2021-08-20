import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

import MovieCard from "../movies/MovieCard";

const useStyles = makeStyles({
  centeredText: {
    textAlign: "center",
  },
});

export default function CardList() {
  const [movies, setMovies] = useState();
  const [results, setResults] = useState();
  const [pointer, setPointer] = useState(0);

  const classes = useStyles();

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
        setResults(data.results);
      })
      .catch((error) => console.log(error));
  }, []);

  const cardAmountHandler = () => {
    let selectedMovies = [];

    if (results > 5) {
      selectedMovies = movies.slice(pointer, 5 + pointer);
    } else {
      selectedMovies = movies;
    }

    return selectedMovies.map((movie) => (
      <Grid item md={2} key={movie.id}>
        <MovieCard
          name={movie.name}
          category={movie.category}
          imageCover={movie.imageCover}
        />
      </Grid>
    ));
  };

  const moveToLeftMovies = () => {
    setPointer(pointer - 1);
  };

  const moveToRightMovies = () => {
    setPointer(pointer + 1);
  };
  console.log(pointer);
  console.log(results - 5);
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={3}
    >
      <Grid item md={1} className={classes.centeredText}>
        {pointer > 0 && (
          <KeyboardArrowLeftIcon
            onClick={moveToLeftMovies}
            fontSize="large"
            color="primary"
          />
        )}
      </Grid>
      {movies && cardAmountHandler()}
      <Grid item md={1} className={classes.centeredText}>
        {pointer < results - 5 && (
          <KeyboardArrowRightIcon
            onClick={moveToRightMovies}
            fontSize="large"
            color="primary"
          />
        )}
      </Grid>
    </Grid>
  );
}
