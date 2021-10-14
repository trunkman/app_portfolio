import React from "react";
import { Link, useHistory } from 'react-router-dom';
//api
import { deleteLogout } from "../apis/sessions";

// ヘッダーのstyle
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import HotelIcon from '@mui/icons-material/Hotel';

// コンポーネント
import { LogInDialog } from "./LogInDialog";

export const Header = (props) => {
  const history = useHistory()

  // ログアウトするコールバック関数
  const handleClickLogout = () => {
    deleteLogout()
      .then(() => {
        props.handleLogOut();
        history.push(`/`);
      })
      .catch(error => console.log("ログアウトエラー", error))
  }

  //返り値：ヘッダー画面
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <HotelIcon />
            <Typography variant="body1">睡眠負債</Typography>
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to='/'>Home</Link>
          </Typography>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to='/user/1'>User</Link>
          </Typography>

          {/* 見やすくするため表示している */}
          <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
            ログイン状態：{props.loggedInStatus}
          </Typography>
          {
            props.loggedInStatus === "ログイン中" ? (
              <Button color="inherit" onClick={handleClickLogout} >
                ログアウト
              </Button>
            ) : (
              <Button color="inherit" onClick={props.handleClickOpenLogIn}>
                ログイン
                <LogInDialog open={props.open}
                  handleClose={props.handleClose}
                  handleLogIn={props.handleLogIn}
                />
              </Button>
            )
          }
        </Toolbar>
      </AppBar>
    </Box>
  )
}
