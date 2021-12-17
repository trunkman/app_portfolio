import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../../App";
// Style
import Box from "@mui/material/Box";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import IconButton from '@mui/material/IconButton';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// Icon
import AccountCircle from '@mui/icons-material/AccountCircle';
// Component
import { DeleteDialog } from "../Dialogs/DeleteDialog";

const useStyles = makeStyles(() =>
  createStyles({
    'menuItem': {
      padding: 10,
      width: 110,
    }
  }),
);

export const AccountButton = ({
  handleLogout,
  handleDelete,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { authState } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton
        color="inherit"
        onClick={e => { setAnchorEl(e.currentTarget) }}
      >
        <AccountCircle />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => { setAnchorEl(null) }}
        sx={{ width: 150 }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={() => history.push(`/users/${authState.loginUser.id}`)} >
          <Box className={classes.menuItem}>プロフィール</Box>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Box className={classes.menuItem}>ログアウト</Box>
        </MenuItem>
        <MenuItem onClick={() => setOpen(true)}>
          <Box className={classes.menuItem}>アカウント削除</Box>
        </MenuItem>
      </Menu>
      <DeleteDialog
        handleClose={() => setOpen(false)}
        handleDelete={handleDelete}
        message={'アカウントを削除'}
        open={open}
      />
    </>
  )
}
