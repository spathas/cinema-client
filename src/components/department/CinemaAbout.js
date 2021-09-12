import { Grid, Typography, Box } from "@material-ui/core";

import aboutImage from "../../images/aboutImage.jpg";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  boxStyle: {
    overflow: "hidden",
    clipPath: "polygon(0 0, 100% 15%, 100% 100%, 0% 85%)",
    marginBottom: "1.5rem",
    paddingLeft: "1.5rem",
  },
  item: {
    marginTop: "2rem",
    marginBottom: "5rem",
  },
});

const CinemaAbout = () => {
  const classes = useStyles();

  return (
    <Box bgcolor={"white"} className={classes.boxStyle}>
      <Grid container spacing={4}>
        <Grid item xl={6} lg={6} md={6} sm={6} className={classes.item}>
          <Typography
            variant={"h2"}
            color={"primary"}
            style={{ marginBottom: "2rem" }}
          >
            About cinema
          </Typography>
          <Typography variant={"subtitle1"} color={"textPrimary"}>
            Cinema 21 is an locally owned and operated art movie theater,
            featuring American independent, foreign language, documentary and
            classic movies. We are located at 616 NW 21st Avenue in the heart of
            the Alphabet Historic District, which abuts the downtown. In the
            rapidly changing Portland landscape, it remains an iconic landmark
            and a link to Portland's past.
            <br />
            <br /> Built in 1926, its original name was The State Theater. The
            venue showed silent films with live organ and had an orchestra pit
            for musical accompaniment. Over the decades it's been called The
            Vista, 21st Avenue Theater and finally starting in 1962, Cinema 21.
            In 2013, two additional screens were added in the adjacent space
            with a new concessions bar and restrooms in the lower lobby. The
            original theater was renovated with new seats and screen, projection
            and sound equipment, carpeting and paint in 2014.
          </Typography>
        </Grid>
        <Grid
          item
          xl={6}
          lg={6}
          md={6}
          sm={6}
          style={{
            backgroundImage: `url(${aboutImage})`,
            backgroundSize: "cover",
          }}
        ></Grid>
      </Grid>
    </Box>
  );
};

export default CinemaAbout;
