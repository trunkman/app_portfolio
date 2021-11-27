import React, { useState } from "react";
// Style
import Divider from '@mui/material/Divider';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
// Icon
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

export const NotificationButton = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Divider />
      <List>
        <ListItem
          button
          color="inherit"
          onClick={() => { setOpen(true) }}
        >
          <ListItemIcon>
            <NotificationsNoneOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary='プロフィール' />
        </ListItem>
      </List>

      <NotificationDialog
        handleClose={() => { setOpen(false) }}
        open={open}
      />
    </>
  )
}
