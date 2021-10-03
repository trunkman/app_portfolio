import React, { Fragment, useEffect, useState } from "react";
import Button from '@mui/material/Button';

// api
import { fetchHome } from "../apis/home";
import { SignUpDialog } from "../components/SignUpDialog"
import { LogInDialog } from "../components/LogInDialog"

export const Home = (props) => {

  const [open, setOpen] = useState(false);

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
      <h1>HOME</h1>
      <h2>ログイン状態：{props.loggedInStatus}</h2>

      <Button variant="outlined" onClick={handleClickOpen}>
        新規登録
      </Button>
      <SignUpDialog open={open} handleClose={handleClose} handleLogin={props.handleLogin} />

      <LogInDialog />
    </Fragment>
  )
}
