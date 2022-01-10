import React, { useContext, useEffect, useState, useReducer } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { AuthContext } from '../App';
// Style
import { styled } from '@mui/system'
// Api
import { checkNotifications } from '../apis/notifications';
// Reducer
import { notificationReducer, notificationInitialState } from '../reducer/NotificationReducer'
// Container
import { AccountActivation } from './Pages/AccountActivation';
import { Book } from './Pages/Book';
import { Diaries } from './Pages/Diaries';
import { FollowFriends } from './Pages/FollowFriends';
import { Header } from './Navigations/Header';
import { Home } from './Pages/Home'
import { MessageRoom } from './Pages/MessageRoom';
import { Bookshelf } from './Pages/Bookshelf';
import { PasswordReset } from './Pages/PasswordReset';
import { Profile } from './Pages/Profile'
import { Ranking } from './Pages/Ranking';
import { MessageRooms } from './Pages/MessageRooms';
import { Timeline } from './Pages/Timeline';
import { Users } from './Pages/Users'
import { Sidebar } from './Navigations/Sidebar';
// Component
import { Loading } from './Items/Loading';

const MainContainer = styled('box')(() => ({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  maxWidth: 1200,
  marginTop: 80,
  mx: 'auto',
  width: '100%',
}));

export const Layout = () => {
  const { authState } = useContext(AuthContext);
  const [notificationState, notificationDispatch] = useReducer(notificationReducer, notificationInitialState);
  // Sidebar開閉する関数群
  const drawerWidth = 240;
  const initialState = window.innerWidth > 1000 ? true : false
  const [open, setOpen] = useState(initialState);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const Notifications = () => {
    checkNotifications()
      .then(data =>
        notificationDispatch({
          type: 'check',
          payload: {
            checkAll: data.check_all,
            checkMessage: data.check_message,
          }
        })
      );
  }

  useEffect(() => {
    Notifications();
  }, [])

  return (
    <BrowserRouter>
      <Header
        checkClese={() => notificationDispatch({ type: 'checkedAll' })}
        checkNotifications={notificationState.checkAll}
        open={open}
        drawerWidth={drawerWidth}
        handleDrawerOpen={handleDrawerOpen}
      />
      <Sidebar
        checkClese={() => notificationDispatch({ type: 'checkedMessage' })}
        checkNotifications={notificationState.checkMessage}
        open={open}
        drawerWidth={drawerWidth}
        handleDrawerClose={handleDrawerClose}
      />

      <MainContainer>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/account_activations/:activationToken/edit"
            render={({ match }) =>
              <AccountActivation
                activationToken={match.params.activationToken}
              />}
          />
          <Route exact path="/password_resets/:passwordResetToken/edit"
            render={({ match }) =>
              <PasswordReset
                passwordResetToken={match.params.passwordResetToken}
              />}
          />

          {authState.loginUser === null && <Loading />}
          {authState.loginUser !== null && authState.loggedIn === false
            ?
            <Route path="/">
              <Home />
            </Route>
            :
            <>
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
                render={({ match }) => <MessageRooms
                  loginUser={authState.loginUser}
                  userId={match.params.id} //不要なら削除
                />}
              />

              <Route exact path="/users/:id/following"
                render={({ match }) => <FollowFriends
                  userId={match.params.id}
                  initialTab='following'
                />}
              />

              <Route exact path="/users/:id/followers"
                render={({ match }) => <FollowFriends
                  userId={match.params.id}
                  initialTab='followers'
                />}
              />

              <Route exact path="/users/:id/books"
                render={({ match }) => <Bookshelf
                  userId={match.params.id}
                />}
              />

              <Route exact path="/users/:id/diaries"
                render={({ match }) => <Diaries
                  userId={match.params.id}
                />}
              />

              <Route exact path="/ranking">
                <Ranking />
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

              <Route exact path="/users">
                <Users
                  isLoggedIn={authState.loggedIn}
                  loginUser={authState.loginUser}
                />
              </Route>
            </>
          }
        </Switch>
      </MainContainer>
    </BrowserRouter >
  );
}
