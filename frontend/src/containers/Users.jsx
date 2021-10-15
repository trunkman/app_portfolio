import React, { Fragment, useState, useEffect } from "react";
import Link from '@mui/material/Link';
// api
import { fetchUsers, deleteUser } from "../apis/users";

export const Users = (props) => {
  const [users, setUsers] = useState([])

  const UsersList = users.map((user) =>
    <li key={user.id}>
      {user.name}
      {
        props.user.admin &&
        <Link component="button" onClick={() => deleteUser(user.id)}>
          delete
        </Link>
      }
    </li >
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
