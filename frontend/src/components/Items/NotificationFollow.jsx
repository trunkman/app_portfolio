import React from "react";
// Style
import Link from '@mui/material/Link';
import ListItem from "@material-ui/core/ListItem";


export const NotificationFollow = ({
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
          さんがあなたをフォローしました。
        </ListItem>
      }

    </>
  );
}
