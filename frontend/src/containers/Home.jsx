import React, { Fragment, useEffect } from "react";
// api
import { fetchHome } from "../apis/home";


export const Home = () => {

  useEffect(() => {
    fetchHome()
      .then((data) =>
        console.log(data)
      )
  }, [])

  return (
    <Fragment>
      <Link to={/signup}>新規登録</Link >
        <Link to={/login}>ログイン</Link >
    </Fragment>
  )
}
