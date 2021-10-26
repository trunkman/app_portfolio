import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
// styled
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Button } from "@mui/material";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import { Menu } from "@mui/material";
// アイコン
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import AccountCircle from '@mui/icons-material/AccountCircle';
// api
import { deleteLogout } from "../apis/sessions"
// コンポーネント
import { LogInDialog } from "./LogInDialog";

export const Header = (props) => {
  const history = useHistory()
  const [anchorEl, setAnchorEl] = useState(null);
  // アンカーを開閉する関数群
  const handleMenu = (event) => { setAnchorEl(event.currentTarget); };
  const handleClose = () => { setAnchorEl(null); };
  // ログアウトするコールバック関数
  const handleLogOut = () => {
    deleteLogout()
      .then(() => {
        props.handleLogOut();
        history.push(`/`);
        alert('ログアウトを成功しました');
      })
  }
  //返り値：ヘッダー画面
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={() => history.push(`/`)} >
            <HealthAndSafetyIcon sx={{ fontSize: 40 }} />
          </IconButton>
          <Typography sx={{ mr: 4 }} variant="body1" onClick={() => history.push(`/`)}>
            ホーム
          </Typography>
          {(props.isLoggedIn) &&
            <Typography sx={{ mr: 4 }} variant="body1" onClick={() => history.push(`/user/${props.user.id}`)}>
              プロフィール
            </Typography>
          }
          {(props.isLoggedIn) &&
            <Typography sx={{ mr: 4 }} variant="body1" onClick={() => history.push(`/users`)}>
              タイムライン
            </Typography>
          }
          <Typography sx={{ mr: 4, flexGrow: 1 }} variant="body1" onClick={() => history.push(`/`)}>
            ランキング
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {
              props.isLoggedIn ? (
                <IconButton color="inherit" onClick={handleMenu}>
                  <AccountCircle />
                </IconButton>
              ) : (
                <Button variant="inherit" onClick={() => props.handleOpenLogIn()}>
                  ログイン
                </Button>
              )
            }
            {/* ダイアログおよびアコーディオンメニュー */}
            <LogInDialog
              open={props.open}
              handleClose={props.handleCloseLogIn}
              handleLogIn={props.handleLogIn}
            />
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>設定</MenuItem>       {/* 仮のonClickを記載 */}
              <MenuItem onClick={handleLogOut}>ログアウト</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
