import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css';
import { fetchLoggedIn } from './apis/sessions'

// コンテイナー
import { Home } from './containers/Home'
import { User } from './containers/User'
import { Users } from './containers/Users'

export default function App() {
  const [loggedInStatus, setLoggedInStatus] = useState("未ログイン");
  const [user, setUser] = useState({});

  // ログインのコールバック関数
  const handleLogIn = (user) => {
    setLoggedInStatus("ログイン中");
    setUser(user);
  }

  // ログアウトのコールバック関数
  const handleLogOut = () => {
    setLoggedInStatus("未ログイン");
    setUser({});
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

  // useEffect(() => {
  //   checkLoginStatus();
  // }, [loggedInStatus])

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
      <Switch>
        <Route exact
          path="/users">
          <Users
            loggedInStatus={loggedInStatus}
            handleLogIn={handleLogIn}
            handleLogOut={handleLogOut}
            user={user}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
