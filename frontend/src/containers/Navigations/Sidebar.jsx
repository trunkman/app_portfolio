import React, { useContext } from 'react';
import { AuthContext } from '../../App';
// styles
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { theme } from '../../styled/theme'
// アイコン
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// Component
import { AvatarLink } from '../../components/Links/AvatarLink';
import { BooksLink } from '../../components/Links/BooksLink';
import { DiariesLink } from '../../components/Links/DiariesLink'
import { FollowsLink } from '../../components/Links/FollowsLink';
import { HomeLink } from '../../components/Links/HomeLink'
import { LogoLink } from '../../components/Links/LogoLink';
import { RankingLink } from '../../components/Links/RankingLink';
import { RoomsLink } from '../../components/Links/RoomsLink';
import { TimelineLink } from '../../components/Links/TimelineLink';

export const Sidebar = ({
  checkClese,
  checkNotifications,
  open,
  drawerWidth,
  handleDrawerClose,
}) => {
  const { authState } = useContext(AuthContext)
  // drawer開閉時のtheme
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
    width: `calc(${theme.spacing(6)} - 4px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(9)} - 4px)`,
    },
  });
  // Drawerのstyle
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1),
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


  return (
    <>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <LogoLink />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <>
          {authState.loggedIn &&
            <>
              <AvatarLink loginUser={authState.loginUser} size="45" />
              <DiariesLink loginUserId={authState.loginUser.id} />
              <TimelineLink loginUserId={authState.loginUser.id} />
              <BooksLink loginUserId={authState.loginUser.id} />
              <FollowsLink loginUserId={authState.loginUser.id} />
              <RoomsLink
                checkClese={checkClese}
                checkNotifications={checkNotifications}
                loginUserId={authState.loginUser.id}
              />
              <RankingLink />
            </>
          }
          <HomeLink />
        </>
      </Drawer>
    </>
  )
}
