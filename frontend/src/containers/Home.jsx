import React, { Fragment, useEffect } from "react";
import Button from '@mui/material/Button';

// api
import { fetchHome } from "../apis/home";
import { SignUpDialog } from "../components/SignUpDialog"
import { LogInDialog } from "../components/LogInDialog"

export const Home = () => {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchHome()
      .then((data) =>
        console.log(data)
      )
  }, [])

  return (
    <Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        新規登録
      </Button>
      <SignUpDialog open={open} handleClose={handleClose} />

      <LogInDialog />
    </Fragment>
  )
}
