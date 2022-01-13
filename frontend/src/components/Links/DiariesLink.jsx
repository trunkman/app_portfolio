import React from "react";
import { Link } from "react-router-dom";
// Style
import Divider from '@mui/material/Divider';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
// Icon
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';


export const DiariesLink = ({
  breakpoint,
  handleDrawerClose,
  loginUserId
}) => {
  return (
    <>
      <Divider />
      <List>
        <ListItem
          button
          component={Link}
          onClick={!breakpoint && (() => handleDrawerClose())}
          to={`/users/${loginUserId}/diaries`}
        >
          <ListItemIcon>
            <CalendarTodayRoundedIcon
              color='primary'
              sx={{ ml: 1 }}
            />
          </ListItemIcon>
          <ListItemText primary='睡眠日記' />
        </ListItem>
      </List>
    </>
  )
}
