import React, { useReducer, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../App";
// Style
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { theme } from '../../styled/theme'
// Icon
import MenuIcon from '@mui/icons-material/Menu';
// Api
import { deleteLogout } from "../../apis/sessions"
import { deleteUser } from "../../apis/users"
// Reducer
import { dialogReducer, dialogInitialState } from '../../reducer/DialogReducer'
// Component
import { AccountButton } from '../../components/Buttons/AccountButton'
import { LogoLink } from '../../components/Links/LogoLink';
import { NotificationButton } from '../../components/Buttons/NotificationButton';
import { NotificationDialog } from "../../components/Dialogs/NotificationDialog"
import { PostButton } from '../../components/Buttons/PostButton';
import { RecordButton } from '../../components/Buttons/RecordButton';
import { RecordDialog } from "../../components/Dialogs/RecordDialog"
import { SnackBar } from "../../components/Snackbars/Snackbar"
import { TweetDialog } from '../../components/Dialogs/TweetDialog';

export const Header = ({
  checkClese,
  checkNotifications,
  open,
  drawerWidth,
  handleDrawerOpen,
}) => {
  const history = useHistory()
  const { authState, authDispatch } = useContext(AuthContext);
  // ダイアログを開閉する関数群
  const [dialogState, dialogDispatch] = useReducer(dialogReducer, dialogInitialState);
  const handleClose = () => dialogDispatch({ type: 'close' });
  // ログアウトする
  const submitLogout = () => {
    deleteLogout()
      .then(() => {
        authDispatch({ type: 'logout' });
        history.push(`/`);
      });
  };
  // アカウント削除を行う
  const submitDelete = () => {
    deleteUser(authState.loginUser.id)
      .then(() => {
        authDispatch({ type: 'deleteUser' });
        history.push(`/`);
      });
  };
  // AppBarのstyle
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    backgroundColor: '#001e3c',
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

  return (
    <>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton>
            <MenuIcon
              color="primary"
              onClick={() => handleDrawerOpen()}
              sx={{
                fontSize: 20,
                ...(open && { display: 'none' }),
              }}
            />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              pl: 4,
              ...(open && { display: 'none' }),
            }}
          >
            <LogoLink />
          </Typography>
          <Box flexGrow={1}></Box>
          {authState.loggedIn &&
            <>
              <PostButton handleClick={() => dialogDispatch({ type: 'micropost' })} />
              <RecordButton handleClick={() => dialogDispatch({ type: 'record' })} />
              <NotificationButton
                checkClese={checkClese}
                checkNotifications={checkNotifications}
                handleClick={() => dialogDispatch({ type: 'notification' })}
              />
              <AccountButton
                handleLogout={submitLogout}
                handleDelete={submitDelete}
              />
            </>
          }
        </Toolbar>
      </AppBar>

      <TweetDialog
        handleClose={handleClose}
        open={dialogState.micropost}
      />
      <RecordDialog
        handleClose={handleClose}
        open={dialogState.record}
      />
      <NotificationDialog
        handleClose={handleClose}
        open={dialogState.notification}
      />

      <SnackBar handleClose={() => authDispatch({ type: 'closeSnackbar' })} />
    </>
  )
}
