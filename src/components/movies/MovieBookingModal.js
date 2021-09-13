import React from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Zoom from "@material-ui/core/Zoom";
import Paper from "@material-ui/core/Paper";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "60vw",
    height: "45vh",
    backgroundColor: theme.palette.dark,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 0,
  },
}));

export default function MovieBookingModal(props) {
  const classes = useStyles();

  const body = (
    <Zoom in={props.handleOpen} timeout={300}>
      <Paper elevation={5} className={classes.paper}>
        booking
      </Paper>
    </Zoom>
  );

  return (
    <div>
      <Modal
        open={props.handleOpen}
        onClick={props.handleClose}
        className={classes.modal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        {body}
      </Modal>
    </div>
  );
}
