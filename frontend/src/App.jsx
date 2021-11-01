import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom'
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
  // ログイン&ログアウト実行のコールバック関数
  const handleLogIn = (loginUser) => {
    setIsLoggedIn(true);
    setLoginUser(loginUser);
  }
  const handleLogOut = () => {
    setIsLoggedIn(false);
    setLoginUser({});
  }
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
  }, [])

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <BrowserRouter>
        <MiniDrawer
          handleLogOut={handleLogOut}
          handleLogIn={handleLogIn}
          isLoggedIn={isLoggedIn}
          loginUser={loginUser}
        />
      </BrowserRouter>
    </Box>
  );
}
