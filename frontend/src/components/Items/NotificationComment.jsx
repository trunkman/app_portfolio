import React from "react";
import { Link } from "react-router-dom";
// Style
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
            color='inherit'
            onClick={() => handleClose()}
            to={`/users/${visitor_user.id}`}
            underline='hover'
          >
            {visitor_user.name}
          </Link>
          さんがあなたの
          <Link
            color='inherit'
            to='#'
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
