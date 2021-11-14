import React from 'react';
// styles
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
// アイコン
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// コンポーネント
import { HomeButton } from '../../components/Navigations/HomeButton'
import { ProfileButton } from '../../components/Navigations/ProfileButton';
import { FollowsButton } from '../../components/Navigations/FollowsButton';
import { MessageButton } from '../../components/Navigations/MessageButton';
import { PostsButton } from '../../components/Navigations/PostsButton';
import { AvatarButton } from '../../components/Navigations/AvatarButton';
import { RankingButton } from '../../components/Navigations/RankingButton';
import { DiariesButton } from '../../components/Navigations/DiariesButton';

export const SideBar = (props) => {
  const open = props.open
  const theme = props.theme

  const openedMixin = (theme) => ({
    width: props.drawerWidth,
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

  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      width: props.drawerWidth,
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
    <Drawer variant="permanent" open={open}>
      <props.DrawerHeader>
        <IconButton onClick={props.handleDrawerClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </props.DrawerHeader>
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
      <DiariesButton loginUserId={props.loginUser.id} />
      <Divider />
      <RankingButton loginUserId={props.loginUser.id} />
    </Drawer>
  )
}
