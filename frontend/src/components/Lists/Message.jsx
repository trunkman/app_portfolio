import React from "react";
// styles
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar"
// アイコン
import AccountCircle from "@mui/icons-material/AccountCircle";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { borderRadius, Box } from "@mui/system";

const useStyles = makeStyles(() =>
  createStyles({
    "p-chat__row": {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
    },
    "p-chat__reverse": {
      display: "flex",
      flexDirection: "row-reverse",
      justifyContent: "flex-end",
    }
  })
)

export const Message = (props) => {
  const classes = useStyles();

  return (
    <ListItem>
      <ListItemAvatar>
        {props.loginUserId ? (
          <AccountCircle className={p - chat__row} />
        ) : (
          <AccountBoxIcon className={p - chat__reverse} />
        )}
      </ListItemAvatar>
      <Box
        sx={{
          p: 1.5,
          border: 0.1,
          borderRadius: '8px',
        }}>
        {props.text}
      </Box>
    </ListItem >
  )
}
