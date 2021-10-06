import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './App.css';
import { Home } from './containers/Home'
import { User } from './containers/User'
import { Header } from './containers/Header'
import { fetchLoggedIn } from './apis/users'

function App() {

  const [loggedInStatus, setLoggedInStatus] = useState("未ログイン");
  const [user, setUser] = useState({});

  // ログインのコールバック関数
  const handleLogin = (data) => {
    setLoggedInStatus("ログイン中")
    setUser(data.user)
  }

  // ログアウトのコールバック関数
  const handleLogout = () => {
    setLoggedInStatus("未ログイン")
    setUser({})
  }

  // ログイン状態を追跡するコールバック関数
  const checkLoginStatus = () => {
    fetchLoggedIn()
      .then((data) => {
        if (data.logged_in && loggedInStatus === "未ログイン") {
          handleLogin(data)
        } else if (!data.logged_in && loggedInStatus === "ログイン中") {
          handleLogout()
        }
      }).catch(e => { console.error(e) })
  }

  useEffect(() => {
    checkLoginStatus()
  }, [])

  return (
    <BrowserRouter>
      <div>
        <nav>
          <Header
            loggedInStatus={loggedInStatus}
            handleLogout={handleLogout}
          />
        </nav>
        <Switch>
          <Route exact
            path="/">
            <Home
              loggedInStatus={loggedInStatus}
              handleLogin={handleLogin}
              handleLogout={handleLogout}
            />
          </Route>
        </Switch>
        <Switch>
          <Route exact
            path="/user/:id"
            render={({ match }) =>
              <User
                match={match}
                loggedInStatus={loggedInStatus}
                user={user}
              />
            }>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
