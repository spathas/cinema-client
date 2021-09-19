import Grid from "@material-ui/core/Grid";
import { Card, CardActionArea, CardContent } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

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

export default function BookingTimeCart(props) {
  const classes = useStyles();
  const id = props.id;
  const schedule = props.schedule;
  const clicked = props.clicked || false;

  const clickHandler = () => {
    props.oneTimeSelect(id);
  };

  const grid = clicked ? classes.gridSelected : classes.gridNonSelected;

  return (
    <Grid item xl={3}>
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
  );
}
