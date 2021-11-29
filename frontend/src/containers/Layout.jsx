import React, { useState, useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../App';
// styles
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { theme } from '../styled/theme'
// アイコン
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// コンテイナー
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
// Component
import { AvatarLink } from '../components/Links/AvatarLink';
import { BooksLink } from '../components/Links/BooksLink';
import { DiariesLink } from '../components/Links/DiariesLink'
import { FollowsLink } from '../components/Links/FollowsLink';
import { RoomsLink } from '../components/Links/RoomsLink';
import { HomeLink } from '../components/Links/HomeLink'
import { NotificationButton } from '../components/Links/NotificationButton'
import { TimelineLink } from '../components/Links/TimelineLink';
import { RankingLink } from '../components/Links/RankingLink';

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

export const Layout = () => {
  const [open, setOpen] = useState(true)
  // Drawerを開閉する関数群
  // sx={{ display: { xs: 'none', md: 'flex' } }}
  const handleDrawerOpen = () => setOpen(true)
  const handleDrawerClose = () => setOpen(false)

  const { authState } = useContext(AuthContext)

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
          <Typography
            variant="h6"
            sx={{ pl: 2 }}>
            <Box sx={{ letterSpacing: 6 }}>睡眠負債</Box>
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <>
          <AvatarLink loginUser={authState.loginUser} size="45" />
          <HomeLink />
          <DiariesLink loginUserId={authState.loginUser.id} />
          <TimelineLink loginUserId={authState.loginUser.id} />
          <BooksLink loginUserId={authState.loginUser.id} />
          <RankingLink loginUserId={authState.loginUser.id} />
          <FollowsLink loginUserId={authState.loginUser.id} />
          <RoomsLink loginUserId={authState.loginUser.id} />
          <NotificationButton loginUserId={authState.loginUser.id} />
        </>
      </Drawer>

      <Box
        component="main"
        sx={{
          width: '100%',
          maxWidth: 1000,
          mt: 9,
          mx: 'auto',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
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
