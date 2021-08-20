import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import { useCallback } from "react";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 450,
  },
});

export default function MovieCard(props) {
  const history = useHistory();
  const classes = useStyles();

  const showDetailHandler = useCallback(
    (e) => {
      e.preventDefault();
      history.push("/movies");
      console.log("test");
    },
    [history]
  );

  return (
    <Grid item>
      <Card className={classes.root}>
        <CardActionArea onClick={showDetailHandler}>
          <CardMedia
            className={classes.media}
            image={props.imageCover}
            title="Boogie"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2" noWrap>
              {props.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.category.toString()}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            onClick={showDetailHandler}
            size="large"
            color="primary"
            fullWidth={true}
            variant="contained"
          >
            Book now
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
