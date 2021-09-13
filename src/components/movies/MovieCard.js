import { useCallback } from "react";
import { useHistory } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Slide from "@material-ui/core/Slide";

import { makeStyles } from "@material-ui/core/styles";

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
      history.push("/movies/" + props.id);
    },
    [history, props.id]
  );

  return (
    <Slide
      direction={props.slideDirection}
      timeout={500}
      in={props.checked}
      mountOnEnter
      unmountOnExit
    >
      <Grid item md={2}>
        <Card className={classes.root}>
          <CardActionArea onClick={showDetailHandler}>
            <CardMedia
              className={classes.media}
              image={props.imageCover}
              title={props.name}
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
            <Button onClick={showDetailHandler} size="large" fullWidth={true}>
              Book Now
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Slide>
  );
}
