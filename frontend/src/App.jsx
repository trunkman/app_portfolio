import React, { useState, useEffect, useReducer, useContext, createContext } from 'react';
import './App.css';
import { AuthContextProvider } from './context/AuthContext'
// styles
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
// api
import { fetchLoggedIn } from './apis/sessions';
// reducer
import { authInitialState, authReducer } from './reducer/AuthReducer'
// コンテイナー
import { Layout } from './containers/Layout';

export const AuthContext = createContext()

export default function App() {
  const [authStatus, authDispatch] = useReducer(authReducer, authInitialState)

  useEffect(() => {
    fetchLoggedIn()
      .then(data => {
        if (data.logged_in && authStatus.loggedIn === false) {
          authDispatch({
            type: 'login',
            payload: data.user,
          })
        } else if (!data.logged_in && authStatus.loggedIn === true) {
          authDispatch({
            type: 'logout',
          })
        }
      })
  }, [])

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [loginUser, setLoginUser] = useState({});
  // // ログイン&ログアウト実行のコールバック関数
  // const handleLogIn = (loginUser) => {
  //   setIsLoggedIn(true);
  //   setLoginUser(loginUser);
  // }
  // const handleLogOut = () => {
  //   setIsLoggedIn(false);
  //   setLoginUser({});
  // }
  // // ログイン状態を保持する
  // useEffect(() => {
  //   fetchLoggedIn()
  //     .then(data => {
  //       if (data.logged_in && isLoggedIn === false) {
  //         handleLogIn(data.user)
  //       } else if (!data.logged_in && isLoggedIn === true) {
  //         handleLogOut()
  //       }
  //     })
  // }, [])

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AuthContext.Provider value={{ authStatus, authDispatch }}>
        <Layout
        // handleLogOut={handleLogOut}
        // handleLogIn={handleLogIn}
        // isLoggedIn={isLoggedIn}
        // loginUser={loginUser}
        />
      </AuthContext.Provider>
    </Box>
  );
}
