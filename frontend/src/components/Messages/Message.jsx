import React from "react";
// styles
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar"
// アイコン
import AccountCircle from "@mui/icons-material/AccountCircle";
import AccountBoxIcon from '@mui/icons-material/AccountBox';

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
      <div>
        ここにメッセージが入る {/* {props.text} */}
      </div>
    </ListItem>
  )
}
