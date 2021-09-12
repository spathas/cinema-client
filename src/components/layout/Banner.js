import React from "react";
import TypeWriterEffect from "react-typewriter-effect";
import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";

import BannerPic from ".../../../src/images/bannerPic.jpg";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  banner: {
    backgroundImage: `url(${BannerPic})`,
    width: "100%",
    height: "95vh",
    marginBottom: "2rem",
  },
  textHeading: {
    color: "white",
    fontSize: "6rem",
  },
  textParagraph: {
    color: "white",
    fontSize: "2rem",
  },
}));

export default function Banner(props) {
  const classes = useStyles();

  return (
    <Grid
      container
      component={"section"}
      spacing={0}
      direction="column"
      justifyContent="center"
      alignItems="center"
      className={classes.banner}
    >
      <Grid item xl={6}>
        <Typography
          varieant={"h1"}
          aling={"center"}
          className={classes.textHeading}
        >
          Athens Cinema
        </Typography>
        <Typography
          component={"span"}
          varieant={"body2"}
          aling={"center"}
          className={classes.textParagraph}
        >
          <TypeWriterEffect
            cursorColor="white"
            startDelay={2000}
            multiText={props.movieNames}
            multiTextDelay={2000}
            typeSpeed={30}
          />
        </Typography>
      </Grid>
    </Grid>
  );
}
