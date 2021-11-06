import React from "react";
import { Link } from "react-router-dom";
// styles
import Divider from '@mui/material/Divider';
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
// アイコン
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';

export const FollowsButton = (props) => {
  return (
    <>
      <Divider />
      <List>
        <ListItem
          button
          color="inherit"
          component={Link}
          to={`/users/${props.loginUserId}/following`}
        >
          <ListItemIcon>
            <PeopleOutlineIcon />
          </ListItemIcon>
          <ListItemText primary='フォロー中/フォロワー' />
        </ListItem>
      </List>
    </>
  )
}
