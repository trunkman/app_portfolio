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
      <p>Idは{props.match.params.id}です</p>
      <p>名前は{ }です</p>
      <p>Emailは{props.match.params.email}です</p>
    </Fragment>
  )
}
