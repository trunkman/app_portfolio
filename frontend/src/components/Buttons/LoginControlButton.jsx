import React, { useState, useContext, useReducer } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../../App";
// Style
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from "@mui/material/Menu";
// Icon
import AccountCircle from '@mui/icons-material/AccountCircle';
// Reducer
import { dialogInitialState, dialogReducer } from '../../reducer/DialogReducer'
// Component
import { LogInDialog } from "../Dialogs/LogInDialog";
import { PasswordResetDialog } from "../Dialogs/PasswordResetDialog";

export const LoginControlBottun = ({ handleLogout }) => {
  const history = useHistory()
  const { authState } = useContext(AuthContext);
  const [dialogState, dialogDispatch] = useReducer(dialogReducer, dialogInitialState)
  const [anchorEl, setAnchorEl] = useState(null);

  // ヘッダーのログインは文字入力ごとにDialogが閉じてしまう
  return (
    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
      {authState.loggedIn ? (
        <IconButton color="inherit" onClick={e => { setAnchorEl(e.currentTarget) }}>
          <AccountCircle />
        </IconButton>
      ) : (
        <Button variant="inherit" onClick={() => dialogDispatch({ type: 'login' })}>
          ログイン
        </Button>
      )
      }

      <LogInDialog
        handleClose={() => dialogDispatch({ type: 'close' })}
        handlePasswordReset={() => dialogDispatch({ type: 'passwordReset' })}
        open={dialogState.login}
      />
      <PasswordResetDialog
        handleClose={() => dialogDispatch({ type: 'close' })}
        open={dialogState.passwordReset}
      />

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(anchorEl)}
        onClose={() => { setAnchorEl(null) }}
      >
        <MenuItem onClick={() => history.push(`/users/${authState.loginUser.id}`)}>
          プロフィール
        </MenuItem>
        <MenuItem onClick={() => history.push(`/contact`)}>
          お問い合わせ
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          ログアウト
        </MenuItem>
      </Menu>
    </Box>
  )
}
