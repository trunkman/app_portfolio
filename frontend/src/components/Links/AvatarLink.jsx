import React from "react";
import { Link } from "react-router-dom";
// Style
import Divider from '@mui/material/Divider';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
// Icon
import AccountCircle from "@mui/icons-material/AccountCircle";

export const AvatarLink = ({
  loginUser,
  size,
}) => {
  return (
    <>
      <Divider />
      <List >
        <ListItem
          button
          component={Link}
          to={`/users/${loginUser.id}`}
        >
          <ListItemIcon>
            <AccountCircle
              color='primary'
              sx={{ fontSize: 35 }}
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
