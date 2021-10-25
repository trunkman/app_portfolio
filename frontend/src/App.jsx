import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css';
// api
import { fetchLoggedIn } from './apis/sessions';
// コンテイナー
import { Home } from './containers/Home'
import { User } from './containers/User'
import { Users } from './containers/Users'
import { Header } from "./components/Header"

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  // ログインのコールバック関数
  const handleLogIn = (user) => {
    setIsLoggedIn(true);
    setUser(user);
  }
  // ログアウトのコールバック関数
  const handleLogOut = () => {
    setIsLoggedIn(false);
    setUser({});
  }
  // ログインDialogを開閉する関数
  const [openLogInDialog, setOpenLogInDialog] = useState(false)
  const handleOpenLogIn = () => setOpenLogInDialog(true)
  const handleCloseLogIn = () => setOpenLogInDialog(false)

  // ログイン状態を保持する
  useEffect(() => {
    fetchLoggedIn()
      .then(data => {
        if (data.user) { handleLogIn(data.user) }
      })
  }, [isLoggedIn])

  return (
    <BrowserRouter>
      <Header
        open={openLogInDialog}
        handleOpenLogIn={handleOpenLogIn}
        handleClose={handleCloseLogIn}
        isLoggedIn={isLoggedIn}
        handleLogIn={handleLogIn}
        handleLogOut={handleLogOut}
        user={user}
      />
      <Switch>
        <Route exact path="/">
          <Home
            isLoggedIn={isLoggedIn}
            handleLogIn={handleLogIn}
            handleLogOut={handleLogOut}
          />
        </Route>
      </Switch>
      <Switch>
        <Route exact path="/user/:id">
          <User
            isLoggedIn={isLoggedIn}
            handleLogIn={handleLogIn}
            handleLogOut={handleLogOut}
            user={user}
          />
        </Route>
      </Switch>
      <Switch>
        <Route exact path="/users">
          <Users
            isLoggedIn={isLoggedIn}
            handleLogIn={handleLogIn}
            handleLogOut={handleLogOut}
            user={user}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
