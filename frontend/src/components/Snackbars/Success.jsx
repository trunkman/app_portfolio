import React from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const SnackbarSample = ({
  handleClose,
  message,
  show,
}) => {

  return (
    <>
      {/* <Button onClick={handleButtonClick} variant="contained">
        Snackbarを表示する
      </Button> */}
      <Snackbar
        open={show}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert severity="warning">
          {message}
        </Alert>
      </Snackbar>
    </>
  )
};
