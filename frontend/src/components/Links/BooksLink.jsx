import React from "react";
import { Link } from "react-router-dom";
// styles
import Divider from '@mui/material/Divider';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
// アイコン
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';

export const BooksLink = ({ loginUserId }) => {

  return (
    <>
      <Divider />
      <List>
        <ListItem
          button
          color="inherit"
          component={Link}
          to={`/users/${loginUserId}/books`}
        >
          <ListItemIcon>
            <ImportContactsOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary='睡眠本 (読了/積読)' />
        </ListItem>
      </List>
    </>
  )
}
