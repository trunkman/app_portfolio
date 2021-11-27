import React from "react";
import { Link } from "react-router-dom";
// styles
import Divider from '@mui/material/Divider';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
// アイコン
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';

export const RoomsLink = ({ loginUserId }) => {
  return (
    <>
      <Divider />
      <List>
        <ListItem
          button
          color="inherit"
          component={Link}
          to={`/users/${loginUserId}/talk_rooms`}
        >
          <ListItemIcon>
            <MessageOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary='トークルーム' />
        </ListItem>
      </List>
    </>
  )
}
