import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
// styles
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
// アイコン
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// コンテイナー
import { Header } from './Navigations/Header';
import { Home } from './Pages/Home'
import { User } from './Pages/User'
import { Users } from './Pages/Users'
import { Contact } from './Pages/Contact';
import { Rooms } from './Pages/Rooms';
import { MessageRoom } from './Pages/MessageRoom';
import { Mybooks } from './Pages/Mybooks';
import { BooksList } from './Books/BooksList';
import { DetailsBook } from './Books/DetailsBook';
// コンポーネント
import { HomeButton } from '../components/Navigations/HomeButton'
import { ProfileButton } from '../components/Navigations/ProfileButton';
import { FollowsButton } from '../components/Navigations/FollowsButton';
import { MessageButton } from '../components/Navigations/MessageButton';
import { PostsButton } from '../components/Navigations/PostsButton';
import { AvatarButton } from '../components/Navigations/AvatarButton';
import { RankingButton } from '../components/Navigations/RankingButton';
import { BooksButton } from '../components/Navigations/BooksButton';
import { Microposts } from './Pages/Microposts';
import { Following } from '../components/Users/Following';

const drawerWidth = 240;
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
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
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
  const init = window.innerWidth < 600 ? false : true
  const [open, setOpen] = useState(init)
  const [openLogInDialog, setOpenLogInDialog] = useState(false)
  // Drawerを開閉する関数群
  const handleDrawerOpen = () => setOpen(true)
  const handleDrawerClose = () => setOpen(false)
  // ログインDialogを開閉する関数群
  const handleOpenLogIn = () => setOpenLogInDialog(true)
  const handleCloseLogIn = () => setOpenLogInDialog(false)

  return (
    <BrowserRouter>
      <Header
        open={open}
        openLogIn={openLogInDialog}
        theme={theme}
        drawerWidth={drawerWidth}
        handleDrawerOpen={handleDrawerOpen}
        handleOpenLogIn={handleOpenLogIn}
        handleCloseLogIn={handleCloseLogIn}
        handleLogOut={props.handleLogOut}
        handleLogIn={props.handleLogIn}
        loginUser={props.loginUser}
        isLoggedIn={props.isLoggedIn}
      />

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
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

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Switch>
          <Route exact path="/">
            <Home
              handleCloseLogIn={handleCloseLogIn}
              handleLogOut={props.handleLogOut}
              handleLogIn={props.handleLogIn}
              handleOpenLogIn={handleOpenLogIn}
              isLoggedIn={props.isLoggedIn}
              open={openLogInDialog}
            />
          </Route>

          <Route exact path="/users/:id"
            render={({ match }) =>
              <User
                handleLogOut={props.handleLogOut}
                handleLogIn={props.handleLogIn}
                isLoggedIn={props.isLoggedIn}
                match={match}
                loginUser={props.loginUser}
              />
            }
          />

          <Route exact path="/users/:id/microposts"
            render={({ match }) => <Microposts
              match={match}
              loginUser={props.loginUser}
            />}
          />

          <Route exact path="/users/:id/rooms"
            render={({ match }) => <Rooms
              match={match}
              loginUser={props.loginUser}
            />}
          />

          <Route exact path="/rooms/:id"
            render={({ match }) => <MessageRoom
              match={match}
              loginUser={props.loginUser}
            />}
          />

          <Route exact path="/users/:id/following"
            render={({ match }) => <Following
              match={match}
            />}
          />

          <Route exact path="/users/:id/books"
            render={({ match }) => <Mybooks
              match={match}
            />}
          />

          <Route exact path="/users">
            <Users
              isLoggedIn={props.isLoggedIn}
              user={props.loginUser}
            />
          </Route>

          <Route exact path="/books">
            <BooksList />
          </Route>

          <Route exact path="/books/:id">
            <DetailsBook />
          </Route>

          <Route exact path="/contact">
            <Contact />
          </Route>


        </Switch>
      </Box>
    </BrowserRouter>
  );
}
