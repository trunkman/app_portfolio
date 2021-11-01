import React from "react";
import { Link } from "react-router-dom";
// styles
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
// アイコン
import MailIcon from '@mui/icons-material/Mail';

export const MessageButton = (props) => {

  return (
    <List>
      <ListItem
        button
        color="inherit"
        component={Link}
        to={`/users/${props.loginUserId}`}
      >
        <ListItemIcon>
          <MailIcon />
        </ListItemIcon>
        <ListItemText primary='メッセージ' />
      </ListItem>
    </List>
  )
}
