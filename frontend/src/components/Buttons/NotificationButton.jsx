import React from "react";
// Style
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
// Icon
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';


export const NotificationButton = ({
  handleClick
}) => {
  return (
    <Box sx={{ mr: 3 }}>
      <IconButton >
        <NotificationsNoneOutlinedIcon
          onClick={() => handleClick()}
        />
      </IconButton>
    </Box>
  )
}
