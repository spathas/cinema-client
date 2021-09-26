import EventSeatIcon from "@material-ui/icons/EventSeat";
import Grid from "@material-ui/core/Grid";

export default function SeatsScreen() {
  return (
    <Grid container direction="row" spacing={2}>
      <Grid item md={5}>
        test
      </Grid>
      <Grid item container md={7} spacing={2}>
        <Grid item md={1}>
          <EventSeatIcon color={"primary"} />
        </Grid>
      </Grid>
    </Grid>
  );
}
