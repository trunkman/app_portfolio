import React from "react";
// styles
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar"
// アイコン
import AccountCircle from "@mui/icons-material/AccountCircle";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { borderRadius, Box } from "@mui/system";

export const Message = (props) => {
  // const classes = isQuestion ? "p-chat__row" : "p-chat__reverse";


  return (
    <ListItem>
      <ListItemAvatar>
        {props.loginUserId ? (
          <AccountCircle />
        ) : (
          <AccountBoxIcon />
        )}
      </ListItemAvatar>
      <Box sx={{
        p: 1.5,
        border: 0.1,
        borderRadius: '8px',
      }}>
        {props.text}
      </Box>
    </ListItem >
  )
}
