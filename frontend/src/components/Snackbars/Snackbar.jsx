import React from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const Snackbar = ({
  handleClose,
  message, //表示するメッセージ内容を渡す
  show,
  type, //どんな表示であるかを渡す(success, info, warning, error)
}) => {

  return (
    <>
      <Snackbar
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        open={show}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert severity={type}>
          {message}
        </Alert>
      </Snackbar>
    </>
  )
};
