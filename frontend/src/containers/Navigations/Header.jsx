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
// Reducer
import { dialogReducer, dialogInitialState } from '../../reducer/DialogReducer'
// Component
import { LoginControlBottun } from '../../components/Buttons/LoginControlButton'
import { MicropostDialog } from '../../components/Dialogs/MicropostDialog';
import { RecordDialog } from "../../components/Dialogs/RecordDialog"

export const Header = (props) => {
  const history = useHistory()
  const { authDispatch } = useContext(AuthContext);
  const [dialogState, dialogDispatch] = useReducer(dialogReducer, dialogInitialState);

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
      });
  };

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
        <Button
          variant="body1"
          onClick={() => dialogDispatch({ type: 'micropost' })}
        >
          投稿
        </Button>
        <MicropostDialog
          handleClose={() => dialogDispatch({ type: 'close' })}
          open={dialogState.micropost}
        />
        <Button
          variant="body1"
          onClick={() => dialogDispatch({ type: 'diary' })}
        >
          日記
        </Button>
        <RecordDialog
          handleClose={() => dialogDispatch({ type: 'close' })}
          open={dialogState.diary}
        />
        <Typography
          sx={{ px: 4 }}
          variant="body1"
          component={Link}
          to={`/booksearch`}
        >
          本の検索
        </Typography>
        <LoginControlBottun
          handleLogout={submitLogout}
        />
      </Toolbar>
    </AppBar>
  )
}
