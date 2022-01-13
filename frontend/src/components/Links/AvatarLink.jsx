import React from "react";
import { Link } from "react-router-dom";
// Style
import Avatar from "@mui/material/Avatar";
import Divider from '@mui/material/Divider';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

export const AvatarLink = ({
  breakpoint,
  handleDrawerClose,
  loginUser,
}) => {

  return (
    <>
      <Divider />
      <List>
        <ListItem
          button
          component={Link}
          onClick={!breakpoint && (() => handleDrawerClose())}
          to={`/users/${loginUser.id}`}
        >
          <ListItemIcon>
            <Avatar
              alt={loginUser.name}
              src={loginUser.avatar_url}
              sx={{ width: 35, height: 35 }}
            />
          </ListItemIcon>
          <ListItemText>
            {loginUser.name}
          </ListItemText>
        </ListItem>
      </List>
    </>
  )
}
