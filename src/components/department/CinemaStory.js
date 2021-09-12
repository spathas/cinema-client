import React from "react";
import { Box, Container, Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
  root: {
    marginBottom: "3rem",
  },
});

export default function CinemaStory() {
  const classes = styles();

  return (
    <Box component={"section"} textAlign="center" className={classes.root}>
      <Container>
        <Box fontSize="h2.fontSize" color="secondary.dark">
          Drinks and food
        </Box>
        <Typography color="textPrimary">
          Turn your trip to Athens Cienamas into a cheerful dining experience
          with our wide selection of made-for-cinema hot meals. Treat yourself
          to nachos, hot dogs or chicken strips or share popcorn and
          chocolate-covered treats.
          <br />
          <br />
          You can now order your favourite cinema treats ahead via the myCinema
          app. Browse our delicious menu, save time and order online.
        </Typography>
      </Container>
    </Box>
  );
}
