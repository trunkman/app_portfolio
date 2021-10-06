import React, { Fragment } from "react";
import { Link, useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import { deleteLogout } from "../apis/users";

export const Header = (props) => {
  const history = useHistory()

  // ログアウトするコールバック関数
  const handleClickLogout = () => {
    deleteLogout()
      .then(() => {
        props.handleLogout()
        history.push(`/`)
      })
      .catch(error => console.log("ログアウトエラー", error))
  }

  return (
    <Fragment>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/user/:id'>User</Link></li>
        <p>ログイン状態：{props.loggedInStatus}</p>
        <Button variant="outlined" onClick={handleClickLogout}>
          ログアウト
        </Button>
      </ul>
    </Fragment>
  )
}
