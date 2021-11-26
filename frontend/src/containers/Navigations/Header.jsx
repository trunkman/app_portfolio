import React, { useReducer, useContext } from 'react';
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../App";
// Style
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
// Icon
import MenuIcon from '@mui/icons-material/Menu';
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
          <Button
            variant="body1"
            onClick={() => dialogDispatch({ type: 'micropost' })}
          >
            投稿
          </Button>
          <Button
            variant="body1"
            onClick={() => dialogDispatch({ type: 'diary' })}
          >
            日記
          </Button>
          <Typography
            sx={{ px: 4 }}
            variant="body1"
            component={Link}
            to={`/booksearch`}
          >
            本の検索
          </Typography>
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
      <SnackBar handleClose={() => authDispatch({ type: 'closeSnackbar' })} />
    </>
  )
}
