import React, { useState, useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../App';
// Style
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/styles';
// Container
import { Book } from './Pages/Book';
import { Diaries } from './Pages/Diaries';
import { Follow } from './Pages/Follow';
import { Header } from './Navigations/Header';
import { Home } from './Pages/Home'
import { MessageRoom } from './Pages/MessageRoom';
import { Mybooks } from './Pages/Mybooks';
import { PasswordReset } from './Pages/PasswordReset';
import { Profile } from './Pages/Profile'
import { Rooms } from './Pages/Rooms';
import { Timeline } from './Pages/Timeline';
import { Users } from './Pages/Users'
import { Sidebar } from './Navigations/Sidebar';

const useStyles = makeStyles(() => ({
  root: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    maxWidth: 1200,
    marginTop: 120,
    mx: 'auto',
    width: '100%',
  },
}));

export const Layout = () => {
  const drawerWidth = 240;
  const classes = useStyles();
  const { authState } = useContext(AuthContext);
  // Drawerを開閉する関数群
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <BrowserRouter>
      <Header
        open={open}
        drawerWidth={drawerWidth}
        handleDrawerOpen={handleDrawerOpen}
        loginUser={authState.loginUser}
        isLoggedIn={authState.loggedIn}
      />
      <Sidebar
        open={open}
        drawerWidth={drawerWidth}
        handleDrawerClose={handleDrawerClose}
      />

      <Box className={classes.root}>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/account_activations/:id/edit">
            <Redirect to="/" />
          </Route>

          <Route exact path="/users/:id"
            render={({ match }) =>
              <Profile
                loginUser={authState.loginUser}
                isLoggedIn={authState.loggedIn}
                userId={match.params.id}
              />
            }
          />

          <Route exact path="/users/:id/timeline"
            render={({ match }) => <Timeline
              loginUser={authState.loginUser}
              userId={match.params.id}
            />}
          />

          <Route exact path="/users/:id/talk_rooms"
            render={({ match }) => <Rooms
              loginUser={authState.loginUser}
              userId={match.params.id} //不要なら削除
            />}
          />

          <Route exact path="/users/:id/following"
            render={({ match }) => <Follow
              userId={match.params.id}
              initialTab='following'
            />}
          />

          <Route exact path="/users/:id/followers"
            render={({ match }) => <Follow
              userId={match.params.id}
              initialTab='followers'
            />}
          />

          <Route exact path="/users/:id/books"
            render={({ match }) => <Mybooks
              userId={match.params.id}
            />}
          />

          <Route exact path="/users/:id/diaries"
            render={({ match }) => <Diaries
              userId={match.params.id}
            />}
          />

          <Route exact path="/users">
            <Users
              isLoggedIn={authState.loggedIn}
              user={authState.loginUser}
            />
          </Route>

          <Route exact path="/talk_rooms/:id"
            render={({ match }) => <MessageRoom
              roomId={match.params.id}
              loginUser={authState.loginUser}
            />}
          />

          <Route exact path="/books/:isbn"
            render={({ match }) => <Book
              bookIsbn={match.params.isbn}
            />}
          />

          <Route exact path="/password_resets/:id/edit"
            render={({ match }) => <PasswordReset
              match={match}
            />}
          />
        </Switch>
      </Box>
    </BrowserRouter >
  );
}
