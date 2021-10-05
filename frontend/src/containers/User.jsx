import React, { Fragment, useEffect } from "react";
import { fetchUser } from "../apis/users";

export const User = (props) => {

  useEffect(() => {
    fetchUser(props.match.params.id)
      .then((data) =>
        console.log(data)
      )
  }, [])

  return (
    <Fragment>
      <h1>ユーザーページ</h1>
      <h2>ログイン状態：{props.loggedInStatus}</h2>
      <p>UserIdは{props.match.params.id}です</p>
    </Fragment>
  )
}
