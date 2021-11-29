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
// Icon
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
// Api
import { deleteLogout } from "../../apis/sessions"
import { deleteUser } from "../../apis/users"
// Reducer
import { dialogReducer, dialogInitialState } from '../../reducer/DialogReducer'
// Component
import { AccountButton } from '../../components/Buttons/AccountButton'
import { TweetDialog } from '../../components/Dialogs/TweetDialog';
import { RecordDialog } from "../../components/Dialogs/RecordDialog"
import { SnackBar } from "../../components/Snackbars/Snackbar"
import { NotificationDialog } from "../../components/Dialogs/NotificationDialog"

export const Header = ({
  open,
  drawerWidth,
  handleDrawerOpen
}) => {
  const history = useHistory()
  const { authState, authDispatch } = useContext(AuthContext);
  const [dialogState, dialogDispatch] = useReducer(dialogReducer, dialogInitialState);

  // ログアウトを行う
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

  return (
    <>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => handleDrawerOpen()}
            edge="start"
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon
              sx={{
                ml: 0.5,
                mr: 5,
                ...(open && { display: 'none' }),
              }}
            />
          </IconButton>
          <Typography
            component="div"
            variant="h6"
            sx={open && { display: 'none' }}
          >
            <Box sx={{ letterSpacing: 6 }}><b>睡眠負債</b></Box>
          </Typography>
          <Box flexGrow={1}></Box>
          <Box
            sx={{ mr: 3 }}
            onClick={() => dialogDispatch({ type: 'micropost' })}
          >
            <b>投稿</b>
          </Box>
          <Box
            sx={{ mr: 3 }}
            onClick={() => dialogDispatch({ type: 'diary' })}
          >
            <b>日記</b>
          </Box>
          <Box sx={{ mr: 3 }}>
            <IconButton >
              <NotificationsNoneOutlinedIcon onClick={() => dialogDispatch({ type: 'notification' })} />
            </IconButton>
          </Box>
          <AccountButton
            handleLogout={submitLogout}
            handleDelete={submitDelete}
          />
        </Toolbar>
      </AppBar>

      <TweetDialog
        handleClose={() => dialogDispatch({ type: 'close' })}
        open={dialogState.micropost}
      />
      <RecordDialog
        handleClose={() => dialogDispatch({ type: 'close' })}
        open={dialogState.diary}
      />
      <NotificationDialog
        handleClose={() => dialogDispatch({ type: 'close' })}
        open={dialogState.notification}
      />
      <SnackBar handleClose={() => authDispatch({ type: 'closeSnackbar' })} />
    </>
  )
}
