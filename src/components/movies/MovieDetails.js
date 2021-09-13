import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import PaperLabel from "../utils/PaperLabel";
import MovieTrailerImage from "./MovieTrailerImage";
import MovieBookingModal from "./MovieBookingModal";

const BookingPage = () => {
  const [movie, setMovie] = useState({});
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    history.push(`/movies/${movieId}/book`);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const history = useHistory();
  const movieId = useParams().movieId;

  useEffect(() => {
    fetch(`http://127.0.0.1:3000/api/v1/movies/${movieId}`)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data.data.data);
      })
      .catch((error) => console.warn(error));
  }, [movieId]);

  return (
    <Box bgcolor="primary.main">
      <Grid container direction="row">
        <Grid
          container
          item
          md={4}
          xl={4}
          justifyContent="space-around"
          alignContent="center"
          alignItems="center"
          direction="column"
        >
          <Grid item>
            <MovieTrailerImage
              imageKey={movie.name}
              imageCover={movie.imageCover}
              title={"Play Trailer"}
              trailer={movie.trailer}
            />
          </Grid>
          <Grid item>
            <Button
              onClick={handleOpen}
              style={{ width: "24rem", fontSize: "1.5rem" }}
            >
              Book Now
            </Button>
          </Grid>
        </Grid>
        <Grid container item md={8} xl={8} direction="column" spacing={2}>
          <PaperLabel keyValue={"name"} value={movie.name} />
          <PaperLabel keyValue={"year"} value={movie.year} />
          <PaperLabel
            keyValue={"duration"}
            value={`${movie.duration} (seconds)`}
          />
          <PaperLabel keyValue={"director"} value={movie.director} />
          <PaperLabel keyValue={"writers"} value={movie.writers} />
          <PaperLabel keyValue={"description"} value={movie.description} />
          <PaperLabel keyValue={"story"} value={movie.story} />
        </Grid>
      </Grid>
      <MovieBookingModal
        trailer={"https://www.youtube.com/embed/IBk8xPHkIn8"}
        handleOpen={open}
        handleClose={handleClose}
      />
    </Box>
  );
};

export default BookingPage;
