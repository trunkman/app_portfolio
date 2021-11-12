import React, { useReducer } from 'react';
import { Link } from "react-router-dom";
// styles
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
// アイコン
import MenuIcon from '@mui/icons-material/Menu';
// reducer
import { dialogReducer, dialogInitialState } from '../../reducer/DialogReducer'
import { loginReducer, loginInitialState } from '../../reducer/LoginReducer'
// コンポーネント
import { LoginControlBottun } from '../../components/Buttons/LoginControlButton'

export const Header = (props) => {
  const [loginState, loginDispatch] = useReducer(loginReducer, loginInitialState)
  const [openState, openDispatch] = useReducer(dialogReducer, dialogInitialState)
  const handleClose = () => openDispatch({ type: 'close' })
  const handleLogin = () => loginDispatch({ type: 'login' })
  const handleLogout = () => loginDispatch({ type: 'logout' })
  const haddleOpenLogin = () => openDispatch({ type: 'login' })

  const open = props.open
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
          onClick={() => props.handleDrawerOpen}
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
        <Typography
          sx={{ px: 4 }}
          variant="body1"
          component={Link}
          to={`/booksearch`}
        >
          本の検索
        </Typography>
        <LoginControlBottun
          handleLogOut={handleLogout}
          handleLogIn={handleLogin}
          loginUser={props.loginUser}
          isLoggedIn={props.isLoggedIn}
        />
      </Toolbar>
    </AppBar>
  )
}
