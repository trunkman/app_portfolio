import React, { useContext } from "react";
import { AuthContext } from "../../App";
// Style
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

export const SnackBar = ({ handleClose }) => {
  const { authState } = useContext(AuthContext);

  return (
    <>
      <Snackbar
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        open={authState.show}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert severity={authState.type}>
          {authState.message}
        </Alert>
      </Snackbar>
    </>
  )
};
