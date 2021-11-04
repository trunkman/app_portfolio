import React from 'react';
// styles
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
// アイコン
import MenuIcon from '@mui/icons-material/Menu';
// コンポーネント
import { LoginControlBottun } from '../../components/Buttons/LoginControlButton'

export const Header = (props) => {
  const open = props.open
  const theme = props.theme
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: props.drawerWidth,
      width: `calc(100% - ${props.drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={props.handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: '36px',
            ...(props.open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" flexGrow={1}>
          睡眠負債
        </Typography>
        <LoginControlBottun
          handleCloseLogIn={props.handleCloseLogIn}
          handleLogOut={props.handleLogOut}
          handleLogIn={props.handleLogIn}
          handleOpenLogIn={props.handleOpenLogIn}
          loginUser={props.loginUser}
          isLoggedIn={props.isLoggedIn}
          open={props.openLogInDialog}
        />
      </Toolbar>
    </AppBar>
  )
}
