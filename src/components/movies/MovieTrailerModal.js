import React from "react";
import Zoom from "@material-ui/core/Zoom";
import Paper from "@material-ui/core/Paper";

import CustomModal from "../utils/CustomModal";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "60vw",
    height: "45vh",
    backgroundColor: theme.palette.dark,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 0,
  },
}));

export default function MovieTrailerModal(props) {
  const classes = useStyles();

  const handleClose = () => {
    props.handleClose();
  };

  const body = (
    <Zoom in={props.handleOpen} timeout={300}>
      <Paper elevation={5} className={classes.paper}>
        <iframe
          width="100%"
          height="100%"
          src={props.trailer}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </Paper>
    </Zoom>
  );

  return (
    <div>
      <CustomModal
        body={body}
        handleOpen={props.handleOpen}
        handleClose={handleClose}
      >
        {body}
      </CustomModal>
    </div>
  );
}
