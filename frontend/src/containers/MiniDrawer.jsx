import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
// styles
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
// アイコン
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// コンテイナー
import { Home } from './Home'
import { User } from './User'
import { Users } from './Users'
import { Contact } from './Contact';
// コンポーネント
import { LoginControlBottun } from '../components/Buttons/LoginControlButton'
import { HomeButton } from '../components/Navigations/HomeButton'
import { ProfileButton } from '../components/Navigations/ProfileButton';
import { FollowsButton } from '../components/Navigations/FollowsButton';
import { MessageButton } from '../components/Navigations/MessageButton';
import { PostsButton } from '../components/Navigations/PostsButton';
import { AvatarButton } from '../components/Navigations/AvatarButton';
import { RankingButton } from '../components/Navigations/RankingButton';
import { Microposts } from '../components/Users/Microposts';

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
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
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

export const MiniDrawer = (props) => {
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
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" flexGrow={1}>
            睡眠負債
          </Typography>
          <LoginControlBottun
            handleCloseLogIn={handleCloseLogIn}
            handleLogOut={props.handleLogOut}
            handleLogIn={props.handleLogIn}
            handleOpenLogIn={handleOpenLogIn}
            loginUser={props.loginUser}
            isLoggedIn={props.isLoggedIn}
            open={openLogInDialog}
          />
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <AvatarButton user={props.loginUser} size="45" />
        <Divider />
        <HomeButton loginUserId={props.loginUser.id} />
        <Divider />
        <ProfileButton loginUserId={props.loginUser.id} />
        <Divider />
        <FollowsButton loginUserId={props.loginUser.id} />
        <Divider />
        <PostsButton loginUserId={props.loginUser.id} />
        <Divider />
        <MessageButton loginUserId={props.loginUser.id} />
        <Divider />
        <RankingButton loginUserId={props.loginUser.id} />
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
          <Route exact epath="/users/:id/microposts"
            render={({ match }) =>
              <Microposts
                match={match}
                loginUser={props.loginUser}
              />
            }
          />
          <Route exact path="/users">
            <Users
              isLoggedIn={props.isLoggedIn}
              user={props.loginUser}
            />
          </Route>
          {/* <Route exact path="/contact">
            <Contact />
          </Route> */}
        </Switch>
      </Box>
    </BrowserRouter>
  );
}
