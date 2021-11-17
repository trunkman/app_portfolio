import React, { useState, useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../App';
// styles
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

// アイコン
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// コンテイナー
import { Book } from './Pages/Book';
import { BookSearch } from './Pages/BookSearch';
import { Contact } from './Pages/Contact';
import { Diaries } from './Pages/Diaries';
import { Follow } from './Pages/Follow';
import { Friends } from './Pages/Friends';
import { Header } from './Navigations/Header';
import { Home } from './Pages/Home'
import { Mybooks } from './Pages/Mybooks';
import { PasswordReset } from './Pages/PasswordReset';
import { Profile } from './Pages/Profile'
import { TalkRoom } from './Pages/TalkRoom';
import { Timeline } from './Pages/Timeline';
import { Users } from './Pages/Users'
// Component
import { HomeButton } from '../components/Links/HomeButton'
import { ProfileButton } from '../components/Links/ProfileButton';
import { FollowsButton } from '../components/Links/FollowsButton';
import { MessageButton } from '../components/Links/MessageButton';
import { PostsButton } from '../components/Links/PostsButton';
import { AvatarButton } from '../components/Links/AvatarButton';
import { RankingButton } from '../components/Links/RankingButton';
import { BooksButton } from '../components/Links/BooksButton';
import { DiariesLink } from '../components/Links/DiariesLink'

const drawerWidth = 300;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});
const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1),
  paper: { background: 'primary' },
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export const Layout = (props) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false)
  // Drawerを開閉する関数群
  const handleDrawerOpen = () => setOpen(true)
  const handleDrawerClose = () => setOpen(false)

  const { authState, authDispatch } = useContext(AuthContext)

  return (
    <BrowserRouter>
      <Header
        open={open}
        drawerWidth={drawerWidth}
        handleDrawerOpen={handleDrawerOpen}
        loginUser={authState.loginUser}
        isLoggedIn={authState.loggedIn}
      />

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Typography variant="h6" sx={{ paddingLeft: '10px' }}>
            睡眠負債
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <>
          <AvatarButton user={authState.loginUser} size="45" />
          <HomeButton loginUserId={authState.loginUser.id} />
          <ProfileButton loginUserId={authState.loginUser.id} />
          <FollowsButton loginUserId={authState.loginUser.id} />
          <PostsButton loginUserId={authState.loginUser.id} />
          <MessageButton loginUserId={authState.loginUser.id} />
          <BooksButton loginUserId={authState.loginUser.id} />
          <RankingButton loginUserId={authState.loginUser.id} />
          <DiariesLink loginUserId={authState.loginUser.id} />
        </>
      </Drawer>

      <Box
        component="main"
        sx={{ width: '100%', maxWidth: 1000, mt: 9, mx: 'auto' }}
      >
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Switch>
            <Route exact path="/">
              <Home
                isLoggedIn={authState.loggedIn}
                handleLogin={authDispatch}
              />
            </Route>

            <Route exact path="/account_activations/:id/edit">
              <Redirect to="/" />
            </Route>

            <Route exact path="/users/:id"
              render={({ match }) =>
                <Profile
                  isLoggedIn={authState.loggedIn}
                  match={match}
                  loginUser={authState.loginUser}
                />
              }
            />

            <Route exact path="/users/:id/timeline"
              render={({ match }) => <Timeline
                userId={match.params.id}
                loginUser={authState.loginUser}
              />}
            />

            <Route exact path="/users/:id/rooms"
              render={({ match }) => <Friends
                usrmatch={match}
                loginUser={authState.loginUser}
              />}
            />

            <Route exact path="/users/:id/following"
              render={({ match }) => <Follow
                match={match}
              />}
            />

            <Route exact path="/users/:id/followers"
              render={({ match }) => <Follow
                match={match}
              />}
            />

            <Route exact path="/users/:id/books"
              render={({ match }) => <Mybooks
                match={match}
                loginUser={authState.loginUser}
              />}
            />

            <Route exact path="/users/:id/diaries"
              render={({ match }) => <Diaries
                match={match}
              />}
            />

            <Route exact path="/users">
              <Users
                isLoggedIn={authState.loggedIn}
                user={authState.loginUser}
              />
            </Route>

            <Route exact path="/talk_rooms/:id"
              render={({ match }) => <TalkRoom
                match={match}
                loginUser={authState.loginUser}
              />}
            />

            <Route exact path="/booksearch">
              <BookSearch />
            </Route>

            <Route exact path="/books/:isbn"
              render={({ match }) => <Book
                match={match}
              />}
            />

            <Route exact path="/contact">
              <Contact />
            </Route>

            <Route exact path="/password_resets/:id/edit"
              render={({ match }) => <PasswordReset
                match={match}
              />}
            />




          </Switch>
        </Box>
      </Box>
    </BrowserRouter >
  );
}
