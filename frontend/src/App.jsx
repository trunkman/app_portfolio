import React, { useState, useEffect } from 'react';
import './App.css';
// styles
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
// api
import { fetchLoggedIn } from './apis/sessions';
// コンテイナー
import { MiniDrawer } from './containers/MiniDrawer';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginUser, setLoginUser] = useState({});
  // const [openLogInDialog, setOpenLogInDialog] = useState(false)
  // ログイン実行のコールバック関数
  const handleLogIn = (loginUser) => {
    setIsLoggedIn(true);
    setLoginUser(loginUser);
  }
  // ログアウト実行のコールバック関数
  const handleLogOut = () => {
    setIsLoggedIn(false);
    setLoginUser({});
  }
  // // ログインDialogを開閉する関数群
  // const handleOpenLogIn = () => setOpenLogInDialog(true)
  // const handleCloseLogIn = () => setOpenLogInDialog(false)
  // ログイン状態を保持する
  useEffect(() => {
    fetchLoggedIn()
      .then(data => {
        if (data.logged_in && isLoggedIn === false) {
          handleLogIn(data.user)
        } else if (!data.logged_in && isLoggedIn === true) {
          handleLogOut()
        }
      })
  }, [isLoggedIn])

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <MiniDrawer
        handleLogOut={handleLogOut}
        handleLogIn={handleLogIn}
        isLoggedIn={isLoggedIn}
        loginUser={loginUser}
      />
    </Box>
  );
}
