import React from "react";
import { useHistory } from "react-router-dom";
// styled
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
// Icon
import AccountCircle from "@mui/icons-material/AccountCircle";
// Component
import { RoomButton } from "../Buttons/RoomButton";
import { FollowButton } from "../Buttons/FollowButton";

export const Following = ({
  followingIds,
  user,
}) => {
  const history = useHistory()

  return (
    <>
      <Box sx={{
        my: 2,
        border: 0.1,
        borderRadius: '8px',
      }}>
        <ListItem
          button
          key={user.name}
          onClick={() => history.push(`/users/${user.id}`)}
        >
          <ListItemAvatar>
            <AccountCircle sx={{ fontSize: 60 }} />
          </ListItemAvatar>
          <ListItemText
            primary={user.name}
            secondary={user.profile}
          />
        </ListItem>
        <RoomButton
          userId={user.id}
        />
        <FollowButton
          userId={user.id}
          followStatus={followingIds.includes(user.id)}
        />
      </Box>
      )
    </>
  )
}
