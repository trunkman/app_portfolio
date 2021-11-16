import React, { useState, useReducer, useContext } from 'react';
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../App";
// styles
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
// アイコン
import MenuIcon from '@mui/icons-material/Menu';
// api
import { postLogIn } from '../../apis/sessions';
import { deleteLogout } from "../../apis/sessions"
// reducer
import { dialogReducer, dialogInitialState } from '../../reducer/DialogReducer'
// コンポーネント
import { LoginControlBottun } from '../../components/Buttons/LoginControlButton'

export const Header = (props) => {
  const [openState, openDispatch] = useReducer(dialogReducer, dialogInitialState)
  const handleClose = () => openDispatch({ type: 'close' })
  // const handleLogin = () => loginDispatch({ type: 'login' })
  // const handleLogout = () => loginDispatch({ type: 'logout' })
  const haddleOpenLogin = () => openDispatch({ type: 'login' })

  const history = useHistory()
  const { authState, authDispatch } = useContext(AuthContext)
  const initialState = {
    email: '',
    password: '',
    rememberMe: '1',
    openLogin: false,
  };
  const [state, setState] = useState(initialState);

  const handleLogin = (data) => {
    authDispatch({
      type: 'login',
      payload: data.user,
    });
  };

  const handleLogout = () => {
    authDispatch({
      type: 'logout',
    });
  };

  const submitLogout = () => {
    deleteLogout()
      .then(() => {
        handleLogout();
        history.push(`/`);
        alert('ログアウトを成功しました');
      })
  }

  const submitLogin = () => {
    postLogIn({
      email: state.email,
      password: state.password,
      remember_me: state.remenberMe,
    }).then(data => {
      handleLogin(data)
      setState({ openLogin: false })
    }
    )
  }

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
          onClick={() => props.handleDrawerOpen()}
          edge="start"
          sx={{
            marginRight: '36px',
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          />
        </IconButton>
        <Typography variant="h6" component="div" flexGrow={1}
          sx={open && { display: 'none' }}
        >
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
          handleLogOut={submitLogout}
          handleLogIn={submitLogin}
          loginUser={props.loginUser}
          isLoggedIn={props.isLoggedIn}
        />
      </Toolbar>
    </AppBar>
  )
}
