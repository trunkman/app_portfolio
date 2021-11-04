import React, { useState } from "react";
import { useHistory } from "react-router";
// styled
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from "@mui/material/Menu";
// アイコン
import AccountCircle from '@mui/icons-material/AccountCircle';
// api
import { deleteLogout } from "../../apis/sessions"
// コンポーネント
import { LogInDialog } from "../Dialogs/LogInDialog";

export const LoginControlBottun = (props) => {
  const loginUserId = props.loginUser.id
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
        handleClose()
        history.push(`/`);
        alert('ログアウトを成功しました');
      })
  }
  //返り値：ヘッダー画面
  return (
    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
      {props.isLoggedIn ? (
        <IconButton color="inherit" onClick={handleMenu}>
          <AccountCircle />
        </IconButton>
      ) : (
        <Button variant="inherit" onClick={() => props.handleOpenLogIn()}>
          ログイン
        </Button>
      )
      }

      <LogInDialog
        open={props.open}
        handleClose={props.handleCloseLogIn}
        handleLogIn={props.handleLogIn}
      />

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => history.push(`/users/${loginUserId}`)}>
          設定
        </MenuItem>
        <MenuItem onClick={() => history.push(`/contact`)}>
          お問い合わせ
        </MenuItem>
        <MenuItem onClick={handleLogOut}>
          ログアウト
        </MenuItem>
      </Menu>
    </Box>
  )
}
