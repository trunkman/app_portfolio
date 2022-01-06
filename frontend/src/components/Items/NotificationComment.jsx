import React from "react";
// Style
import Link from '@mui/material/Link';
import ListItem from "@material-ui/core/ListItem";


export const NotificationComment = ({
  handleClick,
  handleClose,
  notification,
  visitor_user,
}) => {

  return (
    <>
      {
        <ListItem key={notification.id.toString()}>
          <Link
            href={`/users/${visitor_user.id}`}
            onClick={() => handleClose()}
            underline='hover'
          >
            {visitor_user.name}
          </Link>
          さんがあなたの
          <Link
            href='#'
            onClick={() => handleClick(notification.micropost_id)}
            underline='hover'
          >
            投稿
          </Link>
          にコメントしました。
        </ListItem>
      }

    </>
  );
}
