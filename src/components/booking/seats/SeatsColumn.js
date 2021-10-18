import React from "react";

//MUI
import Grid from "@material-ui/core/Grid";

function SeatsColumn(props) {
  return (
    <Grid item container md={1} direction="column">
      {props.children}
    </Grid>
  );
}

export default SeatsColumn;
