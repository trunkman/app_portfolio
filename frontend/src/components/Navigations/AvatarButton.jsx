import React from "react";
import { Link } from "react-router-dom";
// styles
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
// アイコン
import AccountCircle from "@mui/icons-material/AccountCircle";

export const AvatarButton = (props) => {
  return (
    <List >
      <ListItem>
        <ListItemIcon>
          <Avatar
            sx={{ width: props.size, height: props.size }}
            component={Link}
            to={`/users/${props.user.id}`}
          >
            <AccountCircle sx={{ fontSize: props.size }} />
          </Avatar>
        </ListItemIcon>
        <ListItemText>
          {props.user.name}
        </ListItemText>
      </ListItem>
    </List>
  )
}
