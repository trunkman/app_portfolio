import React from "react";
import { Link } from "react-router-dom";
// styles
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
// アイコン
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

export const ProfileButton = (props) => {

  return (
    <List>
      <ListItem
        button
        color="inherit"
        component={Link}
        to={`/users/${props.loginUserId}`}
      >
        <ListItemIcon>
          <PermIdentityIcon />
        </ListItemIcon>
        <ListItemText primary='プロフィール' />
      </ListItem>
    </List>
  )
}
