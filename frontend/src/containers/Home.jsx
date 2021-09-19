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
      Home画面
    </Fragment>
  )
}
