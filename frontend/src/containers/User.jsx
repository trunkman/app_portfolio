import React, { Fragment, useEffect } from "react";
import { fetchUser } from "../apis/users";

export const User = (props) => {

  useEffect(() => {
    fetchUser(props.match.params.id)
  }, [])

  return (
    <Fragment>
      <h1>ユーザーページ</h1>
      <p>Idは{props.match.params.id}です</p>
      <p>名前は{props.user.name}です</p>
      <p>Emailは{props.user.email}です</p>
    </Fragment>
  )
}
