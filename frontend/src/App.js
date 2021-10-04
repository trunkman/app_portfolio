import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// compornents
import { Home } from './containers/Home'
import { User } from './containers/User'

function App() {

  const [loggedInStatus, setLoggedInStatus] = useState("未ログイン");
  const [user, setUser] = useState({});

  const handleLogin = (data) => {
    setLoggedInStatus("ログインなう")
    setUser(data.user)
  }

  const handleLogout = () => {
    setLoggedInStatus("未ログイン")
    setUser({})
  }


  return (
    <Router>
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
            />
          }>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
