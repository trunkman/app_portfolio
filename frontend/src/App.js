import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css';
import { fetchLoggedIn } from './apis/users'

// コンテイナー
import { Home } from './containers/Home'
import { User } from './containers/User'

export default function App() {
  const [loggedInStatus, setLoggedInStatus] = useState("未ログイン");
  const [user, setUser] = useState({});

  // ログインのコールバック関数
  const handleLogIn = (data) => {
    setLoggedInStatus("ログイン中")
    setUser(data.user)
  }

  // ログアウトのコールバック関数
  const handleLogOut = () => {
    setLoggedInStatus("未ログイン")
    setUser({})
  }


  // ログイン状態を追跡するコールバック関数
  const checkLoginStatus = () => {
    fetchLoggedIn()
      .then((data) => {
        if (data.logged_in && loggedInStatus === '未ログイン') {
          handleLogIn(data)
        } else if (!data.logged_in && loggedInStatus === 'ログイン中') {
          handleLogOut()
        }
      }).catch(e => { console.error(e) })
  }

  useEffect(() => {
    checkLoginStatus();
  })

  return (
    <BrowserRouter>
      <Switch>
        <Route exact
          path="/">
          <Home
            loggedInStatus={loggedInStatus}
            handleLogIn={handleLogIn}
            handleLogOut={handleLogOut}
          />
        </Route>
      </Switch>
      <Switch>
        <Route exact
          path="/user/:id"
          render={({ match }) =>
            <User
              loggedInStatus={loggedInStatus}
              handleLogIn={handleLogIn}
              handleLogOut={handleLogOut}
              match={match}
              user={user}
            />
          }>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
