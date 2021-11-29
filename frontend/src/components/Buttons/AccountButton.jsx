import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../../App";
// Style
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from "@mui/material/Menu";
import MenuItem from '@mui/material/MenuItem';
// Icon
import AccountCircle from '@mui/icons-material/AccountCircle';
// Component
import { DeleteDialog } from "../Dialogs/DeleteDialog";

export const AccountButton = ({
  handleLogout,
  handleDelete,
}) => {
  const history = useHistory();
  const { authState } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      {authState.loggedIn &&
        <Box >
          <IconButton color="inherit" onClick={e => { setAnchorEl(e.currentTarget) }}>
            <AccountCircle />
          </IconButton>
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
            <MenuItem onClick={() => setOpen(true)}>
              アカウント削除
            </MenuItem>
          </Menu>
        </Box>
      }
      <DeleteDialog
        handleClose={() => setOpen(false)}
        handleDelete={handleDelete}
        message={'アカウントを削除'}
        open={open}
      />
    </>
  )
}
