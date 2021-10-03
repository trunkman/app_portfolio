import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// compornents
import { Home } from './containers/Home'
import { Users } from './containers/Users'

function App() {

  const [loggedInStatus, setLoggedInStatus] = useState("未ログイン");
  const [user, setUser] = useState({});

  const handleLogin = (data) => {
    setLoggedInStatus("ログインなう")
    setUser(data.user)
  }


  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home loggedInStatus={loggedInStatus} handleLogin={handleLogin} />
        </Route>
      </Switch>
      <Switch>
        <Route exact path="/users">
          <Users />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
