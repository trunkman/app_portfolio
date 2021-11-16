import React from "react";
import { Link } from "react-router-dom";
// styles
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
// アイコン
import AccountCircle from "@mui/icons-material/AccountCircle";

export const AvatarButton = (props) => {
  return (
    <>
      <Divider />
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
    </>
  )
}
