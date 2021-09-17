import React from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

export default function BookingNav() {
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
