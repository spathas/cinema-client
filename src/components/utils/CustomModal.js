import React from "react";

//MUI
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";

//STYLES
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function CustomModal(props) {
  const classes = useStyles();

  const body = props.body;

  return (
    <div>
      <Modal
        open={props.handleOpen}
        onClose={props.handleClose}
        className={classes.modal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <>{body}</>
      </Modal>
    </div>
  );
}
