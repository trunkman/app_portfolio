import React from "react";
// Style
import Link from '@mui/material/Link';
import ListItem from "@material-ui/core/ListItem";
import { Typography } from "@mui/material";

export const NotificationEntry = ({
  handleClose,
  notification,
  visitor_user,
}) => {

  return (
    <>
      {
        <ListItem key={notification.id.toString()}>
          <Typography>
            <Link
              href={`/users/${visitor_user.id}`}
              onClick={() => handleClose()}
              underline='hover'
            >
              {visitor_user.name}
            </Link>
            さんがあなたとの
            <Link
              href={`/users/${notification.visited_id}/talk_rooms`}
              onClick={() => handleClose()}
              underline='hover'
            >
              トークルーム
            </Link>
            を作りました。
          </Typography>
        </ListItem>
      }

    </>
  );
}
