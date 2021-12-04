import React from "react";
// Style
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar"
// Icon
import AccountCircle from "@mui/icons-material/AccountCircle";
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const useStyles = makeStyles(() =>
  createStyles({
    "chatRow": {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      width: '100%',
    },
    "chatReverse": {
      display: "flex",
      flexDirection: "row-reverse",
      width: '100%',
    }
  })
)

export const Message = ({
  message,
  loginUserId,
}) => {
  const classes = useStyles();

  return (
    <>
      <ListItem key={message.id.toString()}>
        {message.user_id === loginUserId ? (
          <Box className={classes.chatReverse} >
            <ListItemAvatar>
              <AccountBoxIcon sx={{ ml: 4 }} />
            </ListItemAvatar>
            <Box
              sx={{
                p: 1.5,
                border: 0.1,
                borderRadius: '4px',
              }}>
              {message.content}
            </Box>
          </Box>
        ) : (
          <Box className={classes.chatRow} >
            <ListItemAvatar>
              <AccountCircle />
            </ListItemAvatar>
            <Box
              sx={{
                p: 1.5,
                border: 0.1,
                borderRadius: '4px',
              }}>
              {message.content}
            </Box>
          </Box>
        )}
      </ListItem >
    </>
  )
}
