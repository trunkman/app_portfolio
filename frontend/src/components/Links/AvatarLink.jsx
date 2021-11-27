import React from "react";
import { Link } from "react-router-dom";
// styles
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
// アイコン
import AccountCircle from "@mui/icons-material/AccountCircle";

export const AvatarLink = ({
  loginUser,
  size,
}) => {
  return (
    <>
      <Divider />
      <List >
        <ListItem>
          <ListItemIcon>
            <Avatar
              sx={{ width: size, height: size }}
              component={Link}
              to={`/users/${loginUser.id}`}
            >
              <AccountCircle sx={{ fontSize: size }} />
            </Avatar>
          </ListItemIcon>
          <ListItemText>
            {loginUser.name}
          </ListItemText>
        </ListItem>
      </List>
    </>
  )
}
