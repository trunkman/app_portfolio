import React, { Fragment, useEffect } from "react";
// api
import { fetchHome } from "../apis/home";
import { SignUpDialog } from "../components/SignUpDialog"
import { LogInDialog } from "../components/LogInDialog"

export const Home = () => {

  useEffect(() => {
    fetchHome()
      .then((data) =>
        console.log(data)
      )
  }, [])

  return (
    <Fragment>
      <SignUpDialog />
      <LogInDialog />
    </Fragment>
  )
}
