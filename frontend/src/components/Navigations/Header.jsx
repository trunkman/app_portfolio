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
// Api
import { deleteLogout } from "../../apis/sessions"
import { deleteUser } from "../../apis/users"
import { fetchMicropost } from "../../apis/microposts";
// Reducer
import { dialogReducer, dialogInitialState } from '../../reducer/DialogReducer'
import { postReducer, postInitialState } from '../../reducer/PostReducer'
// Component
import { AccountButton } from '../Buttons/AccountButton'
import { LogoLink } from '../Links/LogoLink';
import { NotificationButton } from '../Buttons/NotificationButton';
import { NotificationDialog } from "../Dialogs/NotificationDialog";
import { MicropostDialog } from "../Dialogs/MicropostDialog";
import { PostButton } from '../Buttons/PostButton';
import { RecordButton } from '../Buttons/RecordButton';
import { RecordDialog } from "../Dialogs/RecordDialog"
import { SnackBar } from "../Snackbars/Snackbar"
import { TweetDialog } from '../Dialogs/TweetDialog';

export const Header = ({
  checkClese,
  checkNotifications,
  open,
  drawerWidth,
  handleDrawerOpen,
}) => {
  const history = useHistory()
  const { authState, authDispatch } = useContext(AuthContext);
  const [dialogState, dialogDispatch] = useReducer(dialogReducer, dialogInitialState);
  const [postState, postDispatch] = useReducer(postReducer, postInitialState);
  const dialogClose = () => dialogDispatch({ type: 'close' });
  // ログアウトする関数
  const submitLogout = () => {
    deleteLogout()
      .then(() => {
        authDispatch({ type: 'logout' });
        history.push(`/`);
      });
  };
  // アカウント削除を行う関数
  const submitDelete = () => {
    deleteUser(authState.loginUser.id)
      .then(() => {
        authDispatch({ type: 'deleteUser' });
        history.push(`/`);
      });
  };
  // 投稿詳細(コメント付き)を取得する関数
  const fetchDetailMicropost = (micropostId) => {
    postDispatch({ type: 'fetching' })
    fetchMicropost(micropostId)
      .then(data => {
        postDispatch({
          type: 'fetchSuccess',
          payload: {
            micropost: data.micropost,
            user: data.user,
            comments: data.comments,
            likeStatus: data.likeStatus,
          }
        });
        dialogDispatch({ type: 'micropost' });
      });
  }
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
              <PostButton handleClick={() => dialogDispatch({ type: 'tweet' })} />
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
        handleClose={dialogClose}
        open={dialogState.tweet}
      />
      <RecordDialog
        handleClose={dialogClose}
        open={dialogState.record}
      />
      <NotificationDialog
        handleClose={dialogClose}
        open={dialogState.notification}
        fetchDetailMicropost={fetchDetailMicropost}
      />
      <MicropostDialog
        comments={postState.comments}
        handleClose={dialogClose}
        loginUser={authState.loginUser}
        micropost={postState.micropost}
        open={dialogState.micropost}
        user={postState.user}
      />
      <SnackBar handleClose={() => authDispatch({ type: 'closeSnackbar' })} />
    </>
  )
}
