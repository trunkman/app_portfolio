import React from "react";
import { Link } from "react-router-dom";
// styles
import Divider from '@mui/material/Divider';
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
// アイコン
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';

export const PostsButton = (props) => {
  return (
    <>
      <Divider />
      <List>
        <ListItem
          button
          color="inherit"
          component={Link}
          to={`/users/${props.loginUserId}/microposts`}
        >
          <ListItemIcon>
            <FormatListBulletedOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary='つぶやき' />
        </ListItem>
      </List>
    </>
  )
}
