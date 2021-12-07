import React from "react";
// Style
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
// Icon
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

export const NotificationButton = ({
  checkClese,
  handleClick,
  checkNotifications,
}) => {

  const Click = () => {
    handleClick();
    checkClese();
  }

  return (
    <Box sx={{ mr: 3 }}>
      {checkNotifications &&
        <IconButton>
          <NotificationAddIcon
            sx={{ color: '#ffc400' }}
            onClick={Click}
          />
        </IconButton>
      }
      {!checkNotifications &&
        <IconButton>
          <NotificationsNoneOutlinedIcon
            onClick={() => handleClick()}
          />
        </IconButton>
      }
    </Box>
  )
}
