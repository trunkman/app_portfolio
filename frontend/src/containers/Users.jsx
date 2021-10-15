import React, { Fragment, useState, useEffect } from "react";
// api
import { fetchUsers } from "../apis/users";
// コンポーネント
import { Header } from "../components/Header";

export const Users = (props) => {

  const [users, setUsers] = useState([])
  const UsersList = users.map((user) =>
    <li>user.name</li>
  );

  useEffect(() => {
    fetchUsers()
      .then(data => {
        setUsers(data.users)
      })
  }, [])

  // 返り値：ユーザー一覧の画面
  return (
    <Fragment>

      <h1>ユーザー一覧</h1>
      <ul>{UsersList}</ul>
    </Fragment>
  )
}
