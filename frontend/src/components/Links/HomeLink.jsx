import React from "react";
import { Link } from "react-router-dom";
// Style
import Divider from '@mui/material/Divider';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
// Icon
import HomeIcon from '@mui/icons-material/Home';


export const HomeLink = () => {
  return (
    <>
      <Divider />
      <List>
        <ListItem
          button
          component={Link}
          to={`/`}
        >
          <ListItemIcon>
            <HomeIcon
              color='primary'
              sx={{ ml: 1 }}
            />
          </ListItemIcon>
          <ListItemText primary='ホーム' />
        </ListItem>
      </List>
    </>
  )
}
