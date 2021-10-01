import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// compornents
import { Home } from './containers/Home'
import { Users } from './containers/Users'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
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
