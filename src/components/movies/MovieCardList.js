import React, { useState } from "react";
import { Container, Grid } from "@material-ui/core";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

import MovieCard from "./MovieCard";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  centeredText: {
    textAlign: "center",
  },
});

export default function CardList(props) {
  const [pointer, setPointer] = useState(0);
  const [slideDirection, setSlideDirection] = useState("left");

  const movies = props.movies;
  const results = props.results;

  const classes = useStyles();

  const cardItemsHandler = () => {
    let selectedMovies = [];

    if (results > 5) {
      selectedMovies = movies.slice(pointer, 5 + pointer);
    } else {
      selectedMovies = movies;
    }

    return selectedMovies.map((movie) => (
      <MovieCard
        key={movie.id}
        id={movie.id}
        name={movie.name}
        category={movie.category}
        imageCover={movie.imageCover}
        checked={true}
        slideDirection={slideDirection}
      />
    ));
  };

  const moveToLeftMovies = () => {
    setSlideDirection("right");
    setPointer(pointer - 1);
  };

  const moveToRightMovies = () => {
    setSlideDirection("left");
    setPointer(pointer + 1);
  };

  return (
    <Container
      component={"section"}
      maxWidth="xl"
      style={{ marginBottom: "2rem" }}
    >
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
              color="secondary"
              onClick={moveToLeftMovies}
              fontSize="large"
            />
          )}
        </Grid>
        {movies && cardItemsHandler()}
        <Grid item md={1} className={classes.centeredText}>
          {pointer < results - 5 && (
            <KeyboardArrowRightIcon
              onClick={moveToRightMovies}
              fontSize="large"
              color="secondary"
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
