import React from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

// import { makeStyles } from "@material-ui/core/styles";

// const useStyles = makeStyles((theme) => ({}));

export default function BookingNav() {
  //   const classes = useStyles();

  return (
    <div>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" color="secondary" />}
        aria-label="breadcrumb"
      >
        <Typography color="primary">Breadcrumb</Typography>
        <Typography color="primary">Breadcrumb</Typography>
      </Breadcrumbs>
    </div>
  );
}
