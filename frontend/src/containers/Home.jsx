import React, { Fragment, useEffect } from "react";
// api
import { fetchHome } from "../apis/home";
import { SignUpDialog } from "../components/SignUpDialog"

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

      <p>新規登録</p>
      <p>ログイン</p>
    </Fragment>
  )
}
