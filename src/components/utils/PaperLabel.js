import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  bgcolor: {
    background: theme.palette.dark,
  },
}));

const PaperLabel = (props) => {
  const classes = useStyles();

  const keyValue = props.keyValue.toUpperCase();

  let value;
  if (Array.isArray(props.value)) {
    value = props.value.map((value, i, arr) =>
      arr.length > i + 1 ? value + " - " : value
    );
  } else {
    value = props.value;
  }

  return (
    <Grid item>
      <Box clone m={1} p={2} className={classes.bgcolor}>
        <Paper elevation={5}>
          <Grid container spacing={0} alignItems="center" alignContent="center">
            <Grid item md={12}>
              <Typography
                variant="subtitle1"
                color="primary"
                style={{ display: "inline", marginRight: "1rem" }}
              >
                {keyValue}:
              </Typography>
              <Typography
                variant="subtitle2"
                color="primary"
                style={{ display: "inline" }}
              >
                {value}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Grid>
  );
};

export default PaperLabel;
