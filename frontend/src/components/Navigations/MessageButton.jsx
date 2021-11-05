import React from "react";
import { Link } from "react-router-dom";
// styles
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
// アイコン
import MailIcon from '@mui/icons-material/Mail';

export const MessageButton = (props) => {
  return (
    <List>
      <ListItem
        button
        color="inherit"
        component={Link}
        to={`/users/${props.loginUserId}/rooms`}
      >
        <ListItemIcon>
          <MailIcon />
        </ListItemIcon>
        <ListItemText primary='メッセージ' />
      </ListItem>
    </List>
  )
}
