import React from "react";
import { Link } from "react-router-dom";
// Style
import Divider from '@mui/material/Divider';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
// Icon
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';

export const RoomsLink = ({
  breakpoint,
  checkClese,
  checkNotifications,
  handleDrawerClose,
  loginUserId,
}) => {

  return (
    <>
      <Divider />
      <List>
        <ListItem
          button
          component={Link}
          onClick={() => {
            checkClese();
            !breakpoint && handleDrawerClose();
          }}
          to={`/users/${loginUserId}/talk_rooms`}
        >
          {checkNotifications &&
            <ListItemIcon>
              <MarkChatUnreadIcon
                sx={{
                  color: '#ffc400',
                  ml: 1
                }}
              />
            </ListItemIcon>
          }
          {!checkNotifications &&
            <ListItemIcon>
              <MessageOutlinedIcon
                color='primary'
                sx={{ ml: 1 }}
              />
            </ListItemIcon>
          }
          <ListItemText primary='トークルーム' />
        </ListItem>
      </List>
    </>
  )
}
