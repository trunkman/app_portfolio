import React from "react";
import { Link } from "react-router-dom";
// Style
import ListItem from "@material-ui/core/ListItem";


export const NotificationEntry = ({
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
          さんがあなたとの
          <Link
            color='inherit'
            onClick={() => handleClose()}
            to={`/users/${notification.visited_id}/talk_rooms`}
            underline='hover'
          >
            トークルーム
          </Link>
          を作りました。
        </ListItem>
      }

    </>
  );
}
