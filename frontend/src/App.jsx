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
  const [openLogInDialog, setOpenLogInDialog] = useState(false)
  // ログイン実行のコールバック関数
  const handleLogIn = (user) => {
    setIsLoggedIn(true);
    setUser(user);
  }
  // ログアウト実行のコールバック関数
  const handleLogOut = () => {
    setIsLoggedIn(false);
    setUser({});
  }
  // ログインDialogを開閉する関数群
  const handleOpenLogIn = () => setOpenLogInDialog(true)
  const handleCloseLogIn = () => setOpenLogInDialog(false)
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
    <BrowserRouter>
      <Header
        handleCloseLogIn={handleCloseLogIn}
        handleLogOut={handleLogOut}
        handleLogIn={handleLogIn}
        handleOpenLogIn={handleOpenLogIn}
        isLoggedIn={isLoggedIn}
        open={openLogInDialog}
        user={user}
      />
      <Switch>
        <Route exact path="/">
          <Home
            handleCloseLogIn={handleCloseLogIn}
            handleLogOut={handleLogOut}
            handleLogIn={handleLogIn}
            handleOpenLogIn={handleOpenLogIn}
            isLoggedIn={isLoggedIn}
            open={openLogInDialog}
          />
        </Route>
        <Route exact path="/user/:id"
          render={({ match }) =>
            <User
              handleLogOut={handleLogOut}
              handleLogIn={handleLogIn}
              isLoggedIn={isLoggedIn}
              match={match}
              loginUser={user}
            />
          }
        />
        <Route exact path="/users">
          <Users
            handleLogOut={handleLogOut}
            handleLogIn={handleLogIn}
            isLoggedIn={isLoggedIn}
            user={user}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
