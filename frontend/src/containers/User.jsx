import React, { Fragment, useEffect } from "react";
// api
import { fetchUser } from "../apis/users";


export const User = (props) => {

  // useEffect(() => {
  //   fetchUser()
  //     .then((data) =>
  //       console.log(data)
  //     )
  // }, [])

  return (
    <Fragment>
      ユーザーページ
      <p>UserIdは{props.match.params.id}です</p>
    </Fragment>
  )
}
