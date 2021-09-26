import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Box from "@material-ui/core/Box";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Slide from "@material-ui/core/Slide";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  gridNonSelected: {
    backgroundColor: theme.palette.secondary.light,
    border: "3px solid transparent",
  },
  gridSelected: {
    backgroundColor: theme.palette.secondary.light,
    border: `3px solid ${theme.palette.secondary.dark}`,
  },
  availabilityBar: {
    width: "auto",
    height: "4px",
  },
}));

export default function MovieCard(props) {
  const classes = useStyles();
  const id = props.id;
  const schedule = props.schedule;
  const clicked = props.clicked || false;

  const clickHandler = () => {
    props.onScheduleSelect(id);
  };

  const grid = clicked ? classes.gridSelected : classes.gridNonSelected;

  return (
    <Slide
      direction={props.slideDirection}
      timeout={500}
      in={props.checked}
      mountOnEnter
      unmountOnExit
    >
      <Grid item md={3}>
        <Card xl={{ maxWidth: 100 }} className={grid} onClick={clickHandler}>
          <CardActionArea>
            <CardContent>
              <Typography>
                <Typography component={"span"} variant="h5" display="inline">
                  Date:&nbsp;
                </Typography>
                {new Date(schedule.screeningStart).toLocaleString("el-GR", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </Typography>

              <Typography>
                <Typography component={"span"} variant="h5" display="inline">
                  Hall number:&nbsp;
                </Typography>
                {schedule.hall.number}
              </Typography>

              <Typography>
                <Typography component={"span"} variant="h5" display="inline">
                  Hall type:&nbsp;
                </Typography>
                {schedule.hall.typeOfHall.toUpperCase()}
              </Typography>
              <Typography>
                <Typography component={"span"} variant="h5" display="inline">
                  Price:&nbsp;
                </Typography>
                {schedule.hall.price}€
              </Typography>
            </CardContent>
            <Box component="div" className={classes.availabilityBar}></Box>
          </CardActionArea>
        </Card>
      </Grid>
    </Slide>
  );
}
