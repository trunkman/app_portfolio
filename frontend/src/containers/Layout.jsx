import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
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
import { Header } from './Navigations/Header';
import { Home } from './Pages/Home'
import { Profile } from './Pages/Profile'
import { Users } from './Pages/Users'
import { Contact } from './Pages/Contact';
import { Microposts } from './Pages/Microposts';
import { Rooms } from './Pages/Rooms';
import { MessageRoom } from './Pages/MessageRoom';
import { Mybooks } from './Pages/Mybooks';
import { BooksList } from './Books/BooksList';
import { DetailsBook } from './Books/DetailsBook';
import { PasswordReset } from './Pages/PasswordReset';
import { Diaries } from './Pages/Diaries';
import { FollowUsers } from './Pages/FollowUsers';
// コンポーネント
import { HomeButton } from '../components/Navigations/HomeButton'
import { ProfileButton } from '../components/Navigations/ProfileButton';
import { FollowsButton } from '../components/Navigations/FollowsButton';
import { MessageButton } from '../components/Navigations/MessageButton';
import { PostsButton } from '../components/Navigations/PostsButton';
import { AvatarButton } from '../components/Navigations/AvatarButton';
import { RankingButton } from '../components/Navigations/RankingButton';
import { BooksButton } from '../components/Navigations/BooksButton';


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


  return (
    <BrowserRouter>
      <Header
        open={open}
        drawerWidth={drawerWidth}
        handleDrawerOpen={handleDrawerOpen}
        loginUser={props.loginUser}
        isLoggedIn={props.isLoggedIn}
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
          <AvatarButton user={props.loginUser} size="45" />
          <HomeButton loginUserId={props.loginUser.id} />
          <ProfileButton loginUserId={props.loginUser.id} />
          <FollowsButton loginUserId={props.loginUser.id} />
          <PostsButton loginUserId={props.loginUser.id} />
          <MessageButton loginUserId={props.loginUser.id} />
          <BooksButton loginUserId={props.loginUser.id} />
          <RankingButton loginUserId={props.loginUser.id} />
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
                isLoggedIn={props.isLoggedIn}
              />
            </Route>

            <Route exact path="/account_activations/:id/edit">
              <Redirect to="/" />
            </Route>

            <Route exact path="/users/:id"
              render={({ match }) =>
                <Profile
                  isLoggedIn={props.isLoggedIn}
                  match={match}
                  loginUser={props.loginUser}
                />
              }
            />

            <Route exact path="/users/:id/microposts"
              render={({ match }) => <Microposts
                userId={match.params.id}
                loginUser={props.loginUser}
              />}
            />

            <Route exact path="/users/:id/rooms"
              render={({ match }) => <Rooms
                usrmatch={match}
                loginUser={props.loginUser}
              />}
            />

            <Route exact path="/users/:id/following"
              render={({ match }) => <FollowUsers
                match={match}
              />}
            />

            <Route exact path="/users/:id/followers"
              render={({ match }) => <FollowUsers
                match={match}
              />}
            />

            <Route exact path="/users/:id/books"
              render={({ match }) => <Mybooks
                match={match}
                loginUser={props.loginUser}
              />}
            />

            <Route exact path="/users/:id/diaries"
              render={({ match }) => <Diaries
                match={match}
              />}
            />

            <Route exact path="/users">
              <Users
                isLoggedIn={props.isLoggedIn}
                user={props.loginUser}
              />
            </Route>

            <Route exact path="/rooms/:id"
              render={({ match }) => <MessageRoom
                match={match}
                loginUser={props.loginUser}
              />}
            />

            <Route exact path="/booksearch">
              <BooksList />
            </Route>

            <Route exact path="/books/:isbn"
              render={({ match }) => <DetailsBook
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
